import React, { useState } from 'react'
import MyButton from '../../util/MyButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

//mui
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//icon
import CloseIcon from "@material-ui/icons/Close"
import UnfoldMore from "@material-ui/icons/UnfoldMore"
import ChatIcon from '@material-ui/icons/Chat'

//redux
import {useSelector, useDispatch} from 'react-redux'
import { getScream } from '../../Redux/actions/dataActions'

//components
import LikeButton from './LikeButton'
import Comments from './Comments'


const ScreamDialog = ({screamID, userHandle, classes}) =>{
    const [open, setOpen] = useState(false)

    const { 
        scream: { body, createdAt, likeCount,commentCount, userImage, comments }, 
        ui : { loading } 
    } = useSelector(state => ({
        scream: state.data.scream,
        ui: state.ui
    }))

    const dispatch = useDispatch()

    const handleOpen = () => {
        setOpen(true)
        dispatch(getScream(screamID))
    }
    const handleClose = () => {
        setOpen(false)
    }

    const dialogMarkup = loading ? (
        <div className={classes.spinner}>
            <CircularProgress size={50} thickness={2}/>
            <p className={classes.loadingText}>Loading...</p>
        </div>
        
    ) : (
        <Grid container spacing={2}>
            <Grid item sm={2}>
                <img src={userImage} alt="Profile" className={classes.profileImage}/>
            </Grid>
            <Grid item sm={10}>
                <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/users/${userHandle}`}
                >@{userHandle}</Typography>
                <hr className={classes.invisibleSeperator}/>
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeperator}/>
                <Typography variant="body1">{body}</Typography>
                <div className="screamStats">
                <LikeButton screamID={screamID} />
                {likeCount > 0 && <span>{likeCount}</span>}
                <MyButton tip="Comment">
                    <ChatIcon color="primary"/>
                </MyButton>
                {commentCount > 0 && <span>{commentCount}</span>}
                </div>
            </Grid>
            <hr className={classes.visibleSeperator} />
            <Comments comments={comments} />
        </Grid>
    )
    return (
        <>
            <MyButton onClick={handleOpen} tip="expand scream" tipClassName={classes.expandbutton}>
                <UnfoldMore color="primary" />
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <MyButton 
                    tip="Close" 
                    onClick={handleClose} 
                    tipClassName={classes.closeButton}
                >
                    <CloseIcon />
                </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
            </Dialog>
        </>
    )
}


const styles = (theme) =>({
    ...theme.spreadThis,
    profileImage: {
        maxWidth: 75,
        height: 75,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20,
        overflowX: 'hidden'
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandbutton: {
        position: 'absolute',
        right: 10
    },
    spinner: {
        textAlign: 'center',
        margin: '50px 0'
    },
    loadingText: {
        marginTop: 35
    }
})

export default withStyles (styles)(ScreamDialog)