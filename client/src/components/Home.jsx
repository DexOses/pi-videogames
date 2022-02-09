import React from "react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGamesByGender, filterCreated, orderByName, orderByRating, getVideogames } from "../actions"
import Cards from "./Cards";
import SearchBar from "./SearchBar";
import '../css/Home.css'

const Home = () => {
    
    const videogames = useSelector(state => state.videogames)
    console.log(videogames)

    const dispatch = useDispatch();
    
    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)

    let lastGameInPage = currentPage * gamesPerPage // 15
    let firstGameInPage = lastGameInPage - gamesPerPage // 0

    let currentVideogamesItems = videogames?.slice(firstGameInPage, lastGameInPage)

    
    let pages = []
    const numOfPages = Math.ceil(videogames.length / gamesPerPage);
    
    for (let i = 1; i < numOfPages; i++) {
        pages.push(i)
    }

    const paginado = (e, page) => {
        e.preventDefault();
        setCurrentPage(page)
    }

    const renderPages = pages.map(page =>(
        <p key={page}>
            <button onClick={e => paginado(e,page)}>{page}</button>
        </p>
    ))
    ////////////////////////
    //HANDLERS
    const handleFilterStatus = (e) => {
        dispatch(filterGamesByGender(e.target.value))
    }
    
    const handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value))
    }


    const [orden, setOrden] = useState('')

    const handleSortAlf = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); //seteo la pagina principal
        setOrden(`Ordenado ${e.target.value}`)
    }

    const handleSortRat = (e) => {
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1); //seteo la pagina principal
        setOrden(`Ordenado ${e.target.value}`)
    }

    const handleButton = (e) => {
        e.preventDefault();
        dispatch(getVideogames())
    }

    

    //////////////////////////
    return (
        <div>
             <SearchBar />
             <button className="btn" type="submit" onClick={(e) => handleButton(e)}>Volver a todos los videojuegos</button>
            <div style={{display: 'flex'}}>
            <h3>Alfabetico</h3>
            <select className="selects" onChange={e => handleSortAlf(e)}>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <h3>Rating</h3>
            <select className="selects" onChange={e => handleSortRat(e)}>
                <option value='ratasc'>Ascendente</option>
                <option value='ratdesc'>Descendente</option>
            </select>
            <h3>Generos</h3>
            <select className="selects" onChange={e => handleFilterStatus(e)}>
                <option value='All'>All Genres</option>
                <option value='Action'>Action</option>
                <option value='RPG'>RPG</option>
                <option value='Adventure'>Adventure</option>
                <option value='Indie'>Indie</option>
                <option value='Strategy'>Strategy</option>
                <option value='Shooter'>Shooter</option>
                <option value='Casual'>Casual</option>
                <option value='Simulation'>Simulation</option>
                <option value='Puzzle'>Puzzle</option>
                <option value='Arcade'>Arcade</option>
                <option value='Platformer'>Platformer</option>
                <option value='Racing'>Racing</option>
                <option value='Multiplayer'>Massively Multiplayer</option>
                <option value='Sports'>Sports</option>
                <option value='Fighting'>Fighting</option>
                <option value='Family'>Family</option>
                <option value='Board'>Board Games</option>
                <option value='Educational'>Educational</option>
                <option value='Card'>Card</option>
                
            </select>
            <h3>Seleccionar from</h3>
            <select className="selects" onChange={e => handleFilterCreated(e)}>
                <option value='All'>Todos</option>
                <option value='api'>From API</option>
                <option value='Created'>From DB</option>
            </select>
            </div>
            <ul style={{display: 'flex'}}>{renderPages}</ul>
            <Cards videogames={currentVideogamesItems}/>
        </div>
    )
}

export default Home;

