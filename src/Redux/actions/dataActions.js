import {
    SET_SCREAMS,
    SET_SCREAM, 
    LOADING_DATA, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    LOADING_UI,
    POST_SCREAM,
    SET_ERRORS,
    CLEAR_ERRORS,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
} from '../types'
import axios from 'axios'


export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}

export const getScreams = () => dispatch => {
    dispatch({type: LOADING_DATA})
    axios.get('/screams')
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


export const getScream = (screamID) => dispatch => {
    dispatch({type: LOADING_UI})
    axios.get(`/scream/${screamID}`)
    .then(res => {
        dispatch({ 
            type: SET_SCREAM,
            payload: res.data 
        })
        dispatch({ type: STOP_LOADING_UI })
    })
    .catch(err => console.error(err))
}

export const postScream = (newScream) => dispatch => {
    dispatch({type: LOADING_UI})
    axios.post('/scream', newScream)
    .then(res => {
        dispatch({
            type: POST_SCREAM,
            payload: res.data
        })
        dispatch(clearErrors())
    })
    .catch(err=> {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
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

export const submitComment = (screamID, commentData) => dispatch => {
    axios.post(`/scream/${screamID}/comment`, commentData)
    .then(res =>{ 
        dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
        })
        dispatch(clearErrors())
    })
    .catch(err=> {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}
    

export const deleteScream = (screamID) => dispatch => {
    axios.delete(`/scream/${screamID}`)
    .then(()=> dispatch({
        type: DELETE_SCREAM,
        payload: screamID
    }))
    .catch(err => console.log(err))
}


export const getUserData = (userHandle) => dispatch => {
    dispatch({ type: LOADING_DATA })
    axios.get(`/user/${userHandle}`)
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.screams
            });
        })
        .catch(()=> {
            dispatch({
                type: SET_SCREAMS,
                payload: null
            })
        })
}