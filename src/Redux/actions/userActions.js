import axios from 'axios'
import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
} from './../types'

const setAuthHeader = token => {
    const IDToken = `Bearer ${token}`
    localStorage.setItem('DgIdToken', IDToken)
    axios.defaults.headers.common['Authorization'] = IDToken
}

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios
        .post('/login', userData)
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
        .post('/signup', newuserData)
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

export const markNotificationsRead = (notificationID) => (dispatch) => {
    axios.post('/notifications', notificationID)
    .then(dispatch({type: MARK_NOTIFICATIONS_READ}))
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

