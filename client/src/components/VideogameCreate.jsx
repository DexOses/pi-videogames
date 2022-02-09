import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postVideogame } from "../actions";
import '../css/Form.css'


export default function CreateVideogame() {

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        name: '',
        image: '',
        description: '',
        release: '',
        rating: '',
        platforms: [],
        genres: []
    })
    

    const [errors, setErrors] = useState({})

    function validate(input){
        let errors = {};
        if(!input.name){
            errors.name = 'Se requiere un nombre!'
        } else if(typeof input.name === 'number') {
            errors.name = 'Debes ingresar solo texto!'
        } else if(!input.image){
            errors.image = 'Se requiere una direccion de imagen!'
        } else if(!input.description){
            errors.description = 'Se requiere descripcion!'
        } else if(!input.release){
            errors.release = 'Se requiere fecha de lanzamiento!'
        } else if(!input.rating){
            errors.rating = 'Se requiere puntaje rating!'
        } else if(Number(input.rating) < 0){
            errors.rating = 'No se permiten numeros negativos'
        } else if(!input.platforms.length){
            errors.platforms = 'Se requieren plataformas!'
        } else if(!input.genres.length){
            errors.genres = 'Se requieren generos!'
        }
        return errors;
    }

    const [button, setButton] = useState({})

    useEffect(() => {
        input.name &&
        input.image &&
        input.description &&
        input.rating &&
        input.release &&
        input.platforms.length &&
        input.genres.length ? 
        setButton(false) :
        setButton(true)
    },[input])
    

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]:  e.target.value 
        })
        setErrors(validate({
            ...input,
            [e.target.name]:  e.target.value 
        }))
        console.log(input)
    }

    const handleCheckPlatforms = (e) => {
        if (e.target.checked){
            setInput({
                ...input,
                platforms: [...input.platforms , e.target.value]
            })
        }
    }

    const handleCheckGenres = (e) => {
        if (e.target.checked){
            setInput({
                ...input,
                genres:[...input.genres, e.target.value]
            })
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        dispatch(postVideogame(input))
        alert('JUEGO CREADO!!')
        setInput({
            name: '',
            image: '',
            description: '',
            release: '',
            rating: '',
            platforms: [],
            genres: []
        
        })

    }

    return (
        <>
        <Link to='/home'>
            <button>HOME</button>
        </Link>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Name:</label>
                <input type="text" 
                value={input.name} 
                onChange={(e) => handleChange(e)} 
                name='name'/>
                {errors.name && (
                    <p>{errors.name}</p>
                )}
            </div>
            <div>
                <label>Image:</label>
                <input type="text"
                value={input.image}
                onChange={handleChange} 
                name='image'/>
                {errors.image && (
                    <p>{errors.image}</p>
                )}
            </div>
            <div>
                <label>Description:</label>
                <input type="text"
                value={input.description}
                onChange={handleChange} 
                name='description'/>
                {errors.description && (
                    <p>{errors.description}</p>
                )}
            </div>
            <div>
                <label>Release:</label>
                <input type="date"
                value={input.release}
                onChange={handleChange} 
                name='release'/>
                {errors.release && (
                    <p>{errors.release}</p>
                )}
            </div>
            <div>
                <label>Rating:</label>
                <input type="text"
                value={input.rating} 
                onChange={handleChange} 
                name='rating'/>
                {errors.rating && (
                    <p>{errors.rating}</p>
                )}
            </div>
            <div className="table">
                <label>Platforms:</label>
                <label><input 
                type="checkbox"
                value='PC'
                onChange={(e) => handleCheckPlatforms(e)} 
                name='PC'/>PC</label>
                <label><input 
                type="checkbox"
                value='PlayStation 5'
                onChange={(e) => handleCheckPlatforms(e)}
                name='PlayStation 5'/>PlayStation 5</label>
                <label><input 
                type="checkbox"
                value='Xbox One'
                onChange={(e) => handleCheckPlatforms(e)} 
                name='Xbox One'/>Xbox One</label>
                <label><input 
                type="checkbox"
                value='PlayStation 4'
                onChange={(e) => handleCheckPlatforms(e)}
                name='PlayStation 4'/>PlayStation 4</label>
                <label><input 
                type="checkbox"
                value='Xbox Series S/X'
                onChange={(e) => handleCheckPlatforms(e)}
                name='Xbox Series S/X'/>Xbox Series S/X</label>
                <label><input 
                type="checkbox"
                value='Nintendo Switch'
                onChange={(e) => handleCheckPlatforms(e)} 
                name='Nintendo Switch'/>Nintendo Switch</label>
                <label><input 
                type="checkbox"
                value='iOS'
                onChange={(e) => handleCheckPlatforms(e)}
                name='iOS'/>iOS</label>
                <label><input 
                type="checkbox"
                value='Android'
                onChange={(e) => handleCheckPlatforms(e)} 
                name='Android'/>Android</label>
                <label><input 
                type="checkbox"
                value='Nintendo 3DS'
                onChange={(e) => handleCheckPlatforms(e)}
                name='Nintendo 3DS'/>Nintendo 3DS</label>
                <label><input 
                type="checkbox"
                value='Nintendo DS'
                onChange={(e) => handleCheckPlatforms(e)}
                name='Nintendo DS'/>Nintendo DS</label>
                <label><input 
                type="checkbox"
                value='Nintendo DSi'
                onChange={(e) => handleCheckPlatforms(e)}
                name='Nintendo DSi'/>Nintendo DSi</label>
                <label><input 
                type="checkbox"
                value='macOS'
                onChange={(e) => handleCheckPlatforms(e)}
                name='macOS'/>macOS</label>
                <label><input 
                type="checkbox"
                value='Linux'
                onChange={(e) => handleCheckPlatforms(e)}
                name='Linux'/>Linux</label>
                <label><input 
                type="checkbox"
                value='Xbox 360'
                onChange={(e) => handleCheckPlatforms(e)}
                name='Xbox 360'/>Xbox 360</label>
                <label><input 
                type="checkbox"
                value='Xbox'
                onChange={(e) => handleCheckPlatforms(e)}
                name='Xbox'/>Xbox</label>
                <label><input 
                type="checkbox"
                value='PlayStation 3'
                onChange={(e) => handleCheckPlatforms(e)} 
                name='PlayStation 3'/>PlayStation 3</label>
                <label><input 
                type="checkbox"
                value='PlayStation 2'
                onChange={(e) => handleCheckPlatforms(e)}
                name='PlayStation 2'/>PlayStation 2</label>
                <label><input 
                type="checkbox"
                value='PlayStation'
                onChange={(e) => handleCheckPlatforms(e)}
                name='PlayStation'/>PlayStation</label>
                {errors.platforms && (
                    <p>{errors.description}</p>
                )}
            </div>
            <div className="table">
                <label>Genres:</label>
                <label><input 
                type="checkbox"
                value='Action'
                onChange={(e) => handleCheckGenres(e)} 
                name='Action'/>Action</label>
                <label><input 
                type="checkbox"
                value='Indie'
                onChange={(e) => handleCheckGenres(e)} 
                name='Indie'/>Indie</label>
                <label><input 
                type="checkbox"
                value='Adventure'
                onChange={(e) => handleCheckGenres(e)} 
                name='Adventure'/>Adventure</label>
                <label><input 
                type="checkbox"
                value='RPG'
                onChange={(e) => handleCheckGenres(e)} 
                name='RPG'/>RPG</label>
                <label><input 
                type="checkbox"
                value='Strategy'
                onChange={(e) => handleCheckGenres(e)}
                name='Strategy'/>Strategy</label>
                <label><input 
                type="checkbox"
                value='Shooter'
                onChange={(e) => handleCheckGenres(e)} 
                name='Shooter'/>Shooter</label>
                <label><input 
                type="checkbox"
                value='Casual'
                onChange={(e) => handleCheckGenres(e)}
                name='Casual'/>Casual</label>
                <label><input 
                type="checkbox"
                value='Simulation'
                onChange={(e) => handleCheckGenres(e)}
                name='Simulation'/>Simulation</label>
                <label><input 
                type="checkbox"
                value='Puzzle'
                onChange={(e) => handleCheckGenres(e)}
                name='Puzzle'/>Puzzle</label>
                <label><input 
                type="checkbox"
                value='Arcade'
                onChange={(e) => handleCheckGenres(e)}
                name='Arcade'/>Arcade</label>
                <label><input 
                type="checkbox"
                value='Platformer'
                onChange={(e) => handleCheckGenres(e)}
                name='Platformer'/>Platformer</label>
                <label><input 
                type="checkbox"
                value='Racing'
                onChange={(e) => handleCheckGenres(e)}
                name='Racing'/>Racing</label>
                <label><input 
                type="checkbox"
                value='Massively Multiplayer'
                onChange={(e) => handleCheckGenres(e)}
                name='Massively Multiplayer'/>Massively Multiplayer</label>
                <label><input 
                type="checkbox"
                value='Sports'
                onChange={(e) => handleCheckGenres(e)}
                name='Sports'/>Sports</label>
                <label><input 
                type="checkbox"
                value='Fighting'
                onChange={(e) => handleCheckGenres(e)}
                name='Fighting'/>Fighting</label>
                <label><input 
                type="checkbox"
                value='Family'
                onChange={(e) => handleCheckGenres(e)}
                name='Family'/>Family</label>
                <label><input 
                type="checkbox"
                value='Board Games'
                onChange={(e) => handleCheckGenres(e)} 
                name='Board Games'/>Board Games</label>
                <label><input 
                type="checkbox"
                value='Educational'
                onChange={(e) => handleCheckGenres(e)}
                name='Educational'/>Educational</label>
                <label><input 
                type="checkbox"
                value='Card'
                onChange={(e) => handleCheckGenres(e)} 
                name='Card'/>Card</label>
                {errors.genres && (
                    <p>{errors.genres}</p>
                )}
            </div>
            <button disabled={button} type="submit">Create Videogame</button>
        </form>
        </>
    )
}