import React from "react";
import Card from "./Card";
import '../css/Cards.css'

export default function Cards({videogames}) {
    return (
        <div className="cartitas">
            {videogames?.map(videogame => 
            <Card 
            name={videogame.name} 
            genres={videogame.genres}
            image={videogame.image} 
            id={videogame.id}
            key={videogame.id}
            />)}
        </div>
    )

}