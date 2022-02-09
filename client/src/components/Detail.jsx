import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getVideogameDetail, clearVideogameDetail } from "../actions";
import '../css/Detail.css'

export default function Detail() {
    const {id} = useParams()
    const dispatch = useDispatch()

    const videogame = useSelector(state => state.gameDetail)

    useEffect(() => {
        dispatch(getVideogameDetail(id));
        return () => {dispatch(clearVideogameDetail())}
    },[dispatch, id])

    return (
        <>
        <Link to='/home'>
            <button>HOME</button>
        </Link>
        <div>
            {videogame && (
                <>
                    <h3>{videogame.name}</h3><br />
                    <img src={videogame.image} alt="not" width="1200px" height="750px"/><br />
                    <h3>Description: </h3><br />
                    <h5>{videogame.description}</h5><br />
                    <h3>Rating: {videogame.rating}</h3><br />
                    <h3>Release: {videogame.release}</h3><br />
                    <h3>Platforms: {videogame.platforms}</h3><br />
                    <h3>Genres: {videogame.genres}</h3><br />
                </>
            )}
        </div>
        </>
    )
}
