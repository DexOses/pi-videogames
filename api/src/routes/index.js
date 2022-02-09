const { Router } = require('express');
const {Op} = require('sequelize')
const {Videogame, Genre} = require("../db.js");
const { API_KEY } = process.env;
const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


///////////////////////
//CONTROLLERS

const getVideogames = async () => {

    let videoGames = [] 
    
    let page = 1
    
    while (videoGames.length < 100) {
        
        let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`) // await
        response.data.results.map(el => { // capturo la rspuesta xq es asincrono
            videoGames.push({
                id: el.id,
                name: el.name,
                image: el.background_image,
                release: el.released,
                rating: el.rating,
                platforms: el.platforms.map(ch => ch.platform.name),
                genres: el.genres.map(ch => ch.name),
                    
            })
        })
        page++;
    } 
    return videoGames;
     

}

const getDbInfo = async () => {
    return await Videogame.findAll({
        include: [{
            model: Genre,
            as: 'genres',
            attributes: ['id','name']
        }]
    })
}

const getAllVideogames = async () => {
    let apiInfo = await getVideogames();
    let dbInfoP = await getDbInfo();
    let dbInfo = dbInfoP.map(el => {
        return {
            id: el.id,
            name: el.name,
            description: el.description,
            image: el.image,
            release: el.release,
            rating: el.rating,
            platforms: el.platforms.map(ch => ch),
            genres: el.genres.map(ch => ch.name),
            createdInDB : el.createdInDB
        }
    })
    let infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

const getVideogameById = async (id) => {
    if(id.length < 7){
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
    } else {

        /*let gameID= await Videogame.findOne({ 
            where:{id: id},
            include:[{model: Genre}]
        }) */
        let gameID = await Videogame.findByPk( id
          , {  include: Genre  }
        )
        let aux = gameID.dataValues
        console.log('AUUUUUUUUUUUUUUUX')
        console.log(aux)
        return {
            name: aux.name,
            image: aux.image,
            description: aux.description,
            release: aux.release,
            rating: aux.rating,
            platforms: aux.platforms.map(ch => ch),
            genres: aux.genres.map(ch => ch.name)
        }
    }
}

const returnVideoGame = async (id) => {
    let game = await getVideogameById(id);
    return game;
}

///////////////////////
//ROUTES

/*let gameName = gamesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
//toLowerCase();
gameName.length ? 
res.status(200).send(gameName) :
res.status(400).send('VIDEOJUEGO NO ENCONTRADO!');*/

router.get('/videogames', async(req, res) => {
    const name = req.query.name;
    
    if (!name) {
        let gamesTotal = await getAllVideogames();
        res.status(200).send(gamesTotal);
    } else {
        let gamesFromApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        let gameApi = gamesFromApi.data.results.map(el => {
            return {
                id: el.id,
                name: el.name,
                image: el.background_image,
                release: el.released,
                rating: el.rating,
                platforms: el.platforms.map(ch => ch.platform.name),
                genres: el.genres.map(ch => ch.name),
                    
            }
        })
        let gamesFromDB = await Videogame.findAll({
            where: {
                name: {[Op.iLike]: '%'+name+'%'}
            }, include : Genre
        })
        console.log("games from bd")
        console.log(gamesFromDB)
        let gameDb = gamesFromDB.map(el => {
            return {
                id: el.id,
                name: el.name,
                description: el.description,
                image: el.image,
                release: el.release,
                rating: el.rating,
                platforms: el.platforms.map(ch => ch),
                genres: el.genres.map(ch => ch.name),
                createdInDB : el.createdInDB
            }
        })
        let gameTotal = gameApi.concat(gameDb)
        res.status(200).send(gameTotal)
    }
})

router.get('/genres', async(req, res) => {
    try {
      let generos = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      let response = generos.data.results.map((e) => {
        return {
        
          name: e.name,
        };
      });
      
      response.forEach(async (e) => {
        await Genre.findOrCreate({
          where: {
            
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
            description,
            image,
            release,
            rating,
            platforms,
            genres
        } = req.body;
        let gameCreated = await Videogame.create({
            name,
            description,
            image,
            release,
            rating,
            platforms
        })
        let genreDb = await Genre.findAll({
            where: {name: genres}
        })
        console.log('GENREDBBBBBBBBB')
        console.log(genreDb)
        gameCreated.addGenre(genreDb);
        res.send('Personaje creado con exito!');
    } catch (e) {
        console.error(e)  
    }
});

router.post('/genre', async (req, res) => {
    try {
        let {name} = req.body;
        let newGenre = await Genre.create({name: name});
        console.log(newGenre)
        res.status(200).send(newGenre)
        
    } catch (e) {
        res.send(e)
    }
})

router.get('/videogame/:id', async (req, res) => {
    let id = req.params.id;
    if (id){
        let gameId = await returnVideoGame(id);
        Object.entries(gameId).length !== 0 ? 
        res.status(200).json(gameId) :
        res.status(404).send('Personaje no encontrado')
    }
})

module.exports = router;
