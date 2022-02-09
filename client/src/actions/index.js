import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_GENRES = 'GET_GENRES'
export const GET_DETAILS = 'GET_DETAILS'
export const CLEAR_DETAIL = 'CLEAR_DETAIL'
export const FILTER_BY_GENDER = 'FILTER_BY_GENDER'
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const GET_NAME_VIDEOGAME = 'GET_NAME_VIDEOGAME'
export const POST_VIDEOGAME = 'POST_VIDEOGAME'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'

export const getVideogames = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/videogames')
        .then((res) => {
            dispatch({
                type: GET_VIDEOGAMES,
                payload: res.data
            })
        })
        .catch(error => console.log(error))
    }
}

export const getGenres = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/genres')
        .then((res) => {
            dispatch({
                type: GET_GENRES,
                payload: res.data
            })
        })
        .catch(error => console.log(error))
    }
}

export const postVideogame = (payload) =>{
    return async function(dispatch){
        const resp = await axios.post('http://localhost:3001/videogame',payload);
        console.log(resp)
        return resp
    }
}

export const getVideogameDetail = (id) => {
    return async(dispatch) => {
        try {
            const gameDetail = await axios.get(`http://localhost:3001/videogame/${id}`);
            return dispatch({type: GET_DETAILS, payload: gameDetail.data})
        } catch (e) {
            console.log(e)
        }
    }
}

export const getNameVideogame = (name) => {
    return async function(dispatch){
        try {
            let info = await axios.get('http://localhost:3001/videogames?name='+ name)
            return dispatch({
                type: GET_NAME_VIDEOGAME,
                payload: info.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export const clearVideogameDetail = () => {
    return ({type: CLEAR_DETAIL})
}

export function filterGamesByGender(payload){
    console.log(payload)
    return {
        type: 'FILTER_BY_GENDER',
        payload
    }
}

export function filterCreated(payload){
    console.log(payload)
    return {
        type: 'FILTER_BY_CREATED',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByRating(payload){
    return{
        type: 'ORDER_BY_RATING',
        payload
    }
}