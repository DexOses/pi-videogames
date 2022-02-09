import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getNameVideogame } from "../actions";
import '../css/SearchBar.css'

export default function SearchBar() {

    const dispatch = useDispatch();
    
    const [name, setName] = useState('');

    const handleInputChange = (e) =>{
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(getNameVideogame(name))
    }

    return (
        <div className="search">
            <input type="text" 
            placeholder="Buscar..."
            onChange={(e) => handleInputChange(e)}
            />
            <button className="btn" type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
            
            <Link to='/home'>
                    <button>HOME</button>
            </Link>
            
            <Link to='/createVideogame'>
                <button>Crear Videojuego</button>
            </Link>
        </div>
    )
}