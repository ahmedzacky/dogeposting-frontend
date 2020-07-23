import MyButton from '../../util/MyButton'
import React from 'react'
import { Link } from 'react-router-dom'

import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

import { useDispatch, useSelector } from 'react-redux'
import { likeScream, unlikeScream } from '../../Redux/actions/dataActions'


const LikeButton = ({screamID}) => {
    const state = useSelector(state => ({user: state.user}))
    const { user: {authenticated, likes} } = state
    
    const dispatch = useDispatch()  

    const likedScream = () => {
        return likes && likes.find(like => like.screamID === screamID) ? true : false
    }
    const toLikeScream = () => {
        dispatch(likeScream(screamID))
    }
    const toUnlikeScream = () => {
        dispatch(unlikeScream(screamID))
    }

    return (
        !authenticated ? (
        <Link to="/login">
            <MyButton tip="Like" >
               <FavoriteBorder /> 
            </MyButton>
        </Link>
        ) : ( likedScream()? (
            <MyButton tip="Unlike" onClick={toUnlikeScream} >
            <FavoriteIcon color="primary"/> 
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={toLikeScream} >
            <FavoriteBorder /> 
            </MyButton>
        ))
    )
}

export default (LikeButton)
