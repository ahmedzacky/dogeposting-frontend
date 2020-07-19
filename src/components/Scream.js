import React from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '.././util/MyButton'

//mui imports
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

import { likeScream, unlikeScream } from '../Redux/actions/dataActions'
import {useSelector, useDispatch} from 'react-redux'
import DeleteScream from './DeleteScream';



const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200,

    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

const Scream = ({scream, classes}) => {
    const {userImage, body, createdAt, userHandle, screamID, likeCount, commentCount} = scream
    const state = useSelector(state => ({user: state.user}))
    const { user: {authenticated, likes, credentials: {handle}} } = state
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

    const likeButton = !authenticated ? (
        <MyButton tip="Like">
            <Link to="/login">
               <FavoriteBorder /> 
            </Link>
        </MyButton>
    ) : (likedScream()? (
        <MyButton tip="unlike" onClick={toUnlikeScream}>
           <FavoriteIcon color="primary"/> 

        </MyButton>
    ) : (
        <MyButton tip="Like" onClick={toLikeScream}>
           <FavoriteBorder /> 
        </MyButton>
    ));

    const deleteButton = authenticated && userHandle === handle ? (<DeleteScream screamID={screamID}/>) : (null) 

    dayjs.extend(relativeTime)
    return (
        <Card className={classes.card}>
            <CardMedia
                image={userImage}
                title="Profile image"
                className={classes.image}
            />
            <CardContent className={classes.content}>
                <Typography
                    color="primary" 
                    variant="h5" 
                    component={Link} 
                    to={`/users/${userHandle}`}>
                    {userHandle}
                </Typography>
                {deleteButton}
                <Typography 
                    variant="body2" 
                    color="textSecondary">
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography 
                    variant="body1">
                    {body}
                </Typography>
                {likeButton}
                <span> {likeCount} Likes</span>
                <MyButton tip="comment">
                    <ChatIcon color="primary"/>
                </MyButton>
                <span> {commentCount} Comments</span>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(Scream)
