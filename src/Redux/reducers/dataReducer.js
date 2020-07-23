import {
    SET_SCREAMS,
    SET_SCREAM,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SUBMIT_COMMENT
} from '../types'

const initialState = {
    screams: [],
    scream: {},
    loading: false
}


export default function(state = initialState, action){
    let screamsCopy = [...state.screams]
    let index
    let newScreams = []
    switch (action.type){
        default:
            return state
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            index = screamsCopy.findIndex((scream) => scream.screamID === action.payload.screamID)
            screamsCopy[index] = action.payload
            if(state.scream.screamID === action.payload.screamID){
                state.scream = action.payload
            }
            return {
                ...state,
                screams: screamsCopy
            }
        case DELETE_SCREAM:
            index = screamsCopy.findIndex((scream) => scream.screamID === action.payload)
            screamsCopy.splice(index, 1)
            return {
                ...state,
                screams: screamsCopy
            } 
        case POST_SCREAM: 
            newScreams = [action.payload, ...screamsCopy]
            return { 
                ...state,
                screams: newScreams
            }
        case SUBMIT_COMMENT:
            const newScream = {...state.scream}
            newScream.comments = [action.payload, ...newScream.comments]
            return {
                ...state,
                scream: newScream
            }
    }
}