import React from "react";
import { Link } from "react-router-dom";
import '../css/Card.css'

export default function Card({name, image, genres, id}){
    return (
        <>
        <Link to={`/detail/${id}`}>
             <div className="card" >
                <h3>{name}</h3>
                <h4>{genres}</h4>
                <img src={image} alt="not found" width="200px" height="250px" />
            </div>
        </Link>
        </>
    )
}