const { Router } = require('express');
const {Videogame, Genre} = require("../db.js");
const { API_KEY } = process.env;
const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



const getVideogames = async () => {

    const api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const apiInfo = await api.data.results.map(el => {
        return {
            id: el.id,
            name: el.name,
            image: el.background_image,
            release: el.released,
            rating: el.rating,
            platforms: el.platforms.map(ch => ch.platform.name),
            genres: el.genres.map(ch => ch.name)
        };
    });
    return apiInfo;

}

const getDbInfo = async () => {
    return await Videogame.findAll({include: Genre})
}

const getAllVideogames = async () => {
    let apiInfo = await getVideogames();
    let dbInfo = await getDbInfo();
    let infoTotal = await apiInfo.concat(dbInfo);
    return infoTotal;
}

const getVideogameById = async (id) => {
    let apiUrl = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    let apiInfo = await apiUrl.data;
    return { 
        name: apiInfo.name,
        image: apiInfo.background_image,
        description: apiInfo.description,
        release: apiInfo.released,
        rating: apiInfo.rating,
        platforms: apiInfo.platforms.map(ch => ch.platform.name),
        genres: apiInfo.genres.map(ch => ch.name)
    }
}

const returnVideoGame = async (id) => {
    let game = await getVideogameById(id);
    return game;
}

router.get('/videogames', async(req, res) => {
    const name = req.query.name;
    let gamesTotal = await getAllVideogames();
    if (name) {
        let gameName = await gamesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        //toLowerCase();
        gameName.length ? 
        res.status(200).send(gameName) :
        res.status(400).send('NONONONONONONO MALOOOOOO');
    } else {
        res.status(200).send(gamesTotal);
    }
})

router.get('/genres', async(req, res) => {
    try {
      let generos = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      let response = generos.data.results.map((e) => {
        return {
          id: e.id,
          name: e.name,
        };
      });
      response.forEach(async (e) => {
        await Genre.findOrCreate({
          where: {
            id: e.id,
            name: e.name,
          },
        });
      });
      let allGenres = await Genre.findAll();
      return res.send(allGenres);
    } catch (e) {
      console.error(e);
    }
});

router.post('/videogame', async (req, res) => {
    try {
        let {
            name,
            image,
            release,
            rating,
            platforms,
            genres
        } = req.body;
        let gameCreated = await Videogame.create({
            name,
            image,
            release,
            rating,
            platforms
        })
        let genreDb = await Genre.findAll({where: genres})
        gameCreated.addGenre(genreDb);
        res.send('Personaje creado con exito!');
    } catch (e) {
        console.error(e)  
    }
});

router.get('/videogame/:id', async (req, res) => {
    let id = req.params.id;
    if (id){
        let gameId = await returnVideoGame(id);
        console.log(gameId);
        Object.entries(gameId).length !== 0 ? 
        res.status(200).json(gameId) :
        res.status(404).send('Personaje no encontrado')
    }
})

module.exports = router;
