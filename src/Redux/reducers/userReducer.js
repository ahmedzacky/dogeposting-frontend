import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    MARK_NOTIFICATIONS_READ
} from './../types'

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
}

export default function(state = initialState, action){
    switch (action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                ...action.payload,
                authenticated: true,
                loading: false
            };
        case LOADING_USER:
            return{
                ...state,
                loading: true
            }
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes, {
                    userHandle: state.credentials.handle, 
                    screamID: action.payload.screamID
                    }
                ]
            }
        case UNLIKE_SCREAM:
            const newLikes = [...state.likes].filter(like => like.screamID !== action.payload.screamID)
            return {
                ...state,
                likes: newLikes 
            }
        case MARK_NOTIFICATIONS_READ: 
           state.notifications.forEach(notification => notification.read = true)
           return {
               ...state 
           }
        default:
            return state;
    }
}