import { GET_VIDEOGAMES, GET_GENRES, GET_DETAILS, CLEAR_DETAIL, FILTER_BY_GENDER, FILTER_BY_CREATED, ORDER_BY_NAME, GET_NAME_VIDEOGAME, POST_VIDEOGAME, ORDER_BY_RATING } from "../actions";

const initialState = {
    videogames : [],
    allVideogames: [],
    genres: [],
    gameDetail: {}
}
function rootReducer (state = initialState, {type, payload}){
    switch(type){
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,
                allVideogames: payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: payload
            }
        case POST_VIDEOGAME:
            return {
                ...state
            }
        case GET_DETAILS:
            return {
                ...state,
                gameDetail: payload
            }
        case GET_NAME_VIDEOGAME:
            return {
                ...state,
                videogames: payload
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                gameDetail: {}

            }
        case FILTER_BY_GENDER:
            const allVideogames = state.allVideogames
            console.log(allVideogames)
            const statusFilter = payload === 'All' ? allVideogames : allVideogames.filter(el => el.genres.includes(payload))
            console.log(statusFilter)
            return {
                ...state,
                videogames: statusFilter
            }
        case FILTER_BY_CREATED:
            const allVideogames2 = state.allVideogames
            console.log(allVideogames2)
            const createdFilter = payload === 'Created' ? allVideogames2.filter(e => e.createdInDB === true) : allVideogames2.filter(el => !el.createdInDB)
            console.log(createdFilter)
            return {
                ...state,
                videogames: payload === 'All' ? state.allVideogames : createdFilter
            }
        case ORDER_BY_NAME:
            let sortedGames = payload === 'asc' ? 
            state.videogames.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.videogames.sort(function(a, b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1
                }
                return 0;
            })
            return{
                ...state,
                videogames: sortedGames
            }
        case ORDER_BY_RATING:
            let sortedGames1 = payload === 'ratasc' ? 
            state.videogames.sort(function(a,b){
                if(a.rating > b.rating){
                    return 1;
                }
                if(b.rating > a.rating){
                    return -1;
                }
                return 0;
            }) :
            state.videogames.sort(function(a, b){
                if(a.rating > b.rating){
                    return -1;
                }
                if(b.rating > a.rating){
                    return 1
                }
                return 0;
            })
            return{
                ...state,
                videogames: sortedGames1
            }
        default:
            return state;
    }
}

export default rootReducer;