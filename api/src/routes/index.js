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

    const api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const apiInfo = await api.data.results.map(el => {
        return {
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

 /*const db = await Videogame.findAll({include: Genre})
        if (api) {
            let apiResponse = api.data.results?.map((ch) => {
                return {
                    name: ch.name,
                    image: ch.background_image,
                    release: ch.released,
                    rating: ch.rating,
                }
            })
            let response = apiResponse;
            res.send(api)
        }*/
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


module.exports = router;
