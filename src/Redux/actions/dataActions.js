import {
    SET_SCREAMS, 
    LOADING_DATA, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    LOADING_UI,
    POST_SCREAM,
    SET_ERRORS,
    CLEAR_ERRORS
} from '../types'
import axios from 'axios'


export const getScreams = () => dispatch => {
    dispatch({type: LOADING_DATA})
    axios.get('https://europe-west1-dogeposting-cdbdd.cloudfunctions.net/api/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
}

export const postScream = (newScream) => dispatch => {
    dispatch({type: LOADING_UI})
    axios.post('/scream', newScream)
    .then(res => {
        dispatch({
            type: POST_SCREAM,
            payload: res.data
        })
        dispatch({ type: CLEAR_ERRORS })
    })
    .catch(err=> {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS})
}

export const likeScream = (screamID) => dispatch => {
    axios.get(`/scream/${screamID}/like`)
    .then(res=> {
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const unlikeScream = (screamID) => dispatch => {
    axios.get(`/scream/${screamID}/unlike`)
    .then(res=> {
        dispatch({
            type: UNLIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}
    

export const deleteScream = (screamID) => dispatch => {
    axios.delete(`/scream/${screamID}`)
    .then(()=> dispatch({
        type: DELETE_SCREAM,
        payload: screamID
    }))
    .catch(err => console.log(err))
}