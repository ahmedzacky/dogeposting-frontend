import React from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//components
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'

//mui imports
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'

//redux
import { useSelector } from 'react-redux'
import DeleteScream from './DeleteScream';

const Scream = ({scream, classes, openDialog}) => {
    const {userImage, body, createdAt, userHandle, screamID, likeCount, commentCount} = scream
    const state = useSelector(state => ({user: state.user}))
    const { user: {authenticated, credentials: {handle}} } = state

    const deleteButton = authenticated && userHandle === handle && (<DeleteScream screamID={screamID}/>)

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
                    to={`/doges/${userHandle}`}
                >
                    {userHandle}
                </Typography>
                {deleteButton}
                <Typography 
                    variant="body2" 
                    color="textSecondary"
                >
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1">
                    {body}
                </Typography>
                <div className="screamStats">
                <LikeButton screamID={screamID} />
                {likeCount > 0 && <span className="stats">{likeCount}</span>}
                <ScreamDialog screamID={screamID} userHandle={userHandle} openDialog={openDialog} commentCount={commentCount}/>
                </div>
              
            </CardContent>
        </Card>
    )
}

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: '60px',
        maxHeight: '60px',
        borderRadius: '50%',
        marginLeft: '5px',
        marginTop: '15px'

    },
    content: {
        padding: '15px 15px 0 15px',
        paddingBottom: 0,
        objectFit: 'cover',
        '&:last-child': {
            paddingBottom: 0
        },
    }
}

export default withStyles(styles)(Scream)
