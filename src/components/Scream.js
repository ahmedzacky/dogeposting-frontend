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
        maxHeight: 200,
        borderRadius: 5

    },
    content: {
        padding: '15px 15px 0 15px',
        paddingBottom: 0,
        objectFit: 'cover',
        '&:last-child': {
            paddingBottom: 0
        }
    },
    likeButton: {
        padding: 0,
        marginRight: 7
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
        <MyButton tip="Like" btnClassName={classes.likeButton}>
            <Link to="/login">
               <FavoriteBorder /> 
            </Link>
        </MyButton>
    ) : (likedScream()? (
        <MyButton tip="unlike" onClick={toUnlikeScream} btnClassName={classes.likeButton}>
           <FavoriteIcon color="primary"/> 

        </MyButton>
    ) : (
        <MyButton tip="Like" onClick={toLikeScream} btnClassName={classes.likeButton}>
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
                <div className="scream-stats">
                {likeButton}
                {likeCount > 0 && <span>{likeCount}</span>}
                <MyButton tip="comment">
                    <ChatIcon color="primary"/>
                </MyButton>
                {commentCount > 0 && <span>{commentCount}</span>}
                </div>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(Scream)
