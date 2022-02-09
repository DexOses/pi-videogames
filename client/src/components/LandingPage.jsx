import React from "react";
import {Link} from 'react-router-dom';
import '../css/LandingPage.css'

export default function LandingPage(){
    return(
        <div>
            <h1 className="welc">Bienvenidos</h1>
            <h1 className="welc">Proyecto Videogames</h1>
            <Link to = '/home'>
                <button className="land">Ver Proyecto</button>
            </Link>
        </div>
    )
}