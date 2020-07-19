import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER
} from './../types'

import axios from 'axios'

const setAuthHeader = token => {
    const IDToken = `Bearer ${token}`
    localStorage.setItem('DgIdToken', IDToken)
    axios.defaults.headers.common['Authorization'] = IDToken
}


export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios
        .post('https://europe-west1-dogeposting-cdbdd.cloudfunctions.net/api/login', userData)
        .then(res => {
            setAuthHeader(res.data.token)
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS})
            history.push('/')
        })
        .catch(err =>{
            if (err.response.data.err === "auth/user-not-found"){
                dispatch({type: CLEAR_ERRORS})
                history.push('/signup')
            } else { 
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            }
        })
}

export const signupUser = (newuserData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios
        .post('https://europe-west1-dogeposting-cdbdd.cloudfunctions.net/api/signup', newuserData)
        .then(res => {
            setAuthHeader(res.data.token)
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS})
            history.push('/')
        })
        .catch(err =>{
            if (err.response.data.err === "auth/user-not-found"){
                dispatch({type: CLEAR_ERRORS})
                history.push('/signup')
            } else { 
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            }
        })
}

export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.error(err))
}


export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.post('/user/image', formData)
    .then(() => dispatch(getUserData()))
    .catch(err => console.error(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios
    .post('/user', userDetails)
    .then(()=> dispatch(getUserData()))
    .catch(err => console.error(err))
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('DgIdToken');
    delete axios.defaults.headers.common['Authorization']
    dispatch({type: SET_UNAUTHENTICATED})
}

