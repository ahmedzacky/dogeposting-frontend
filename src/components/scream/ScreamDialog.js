import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet' 

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
import { useSelector, useDispatch } from 'react-redux'
import { getScream, clearErrors } from '../../Redux/actions/dataActions'

//components
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
import MyButton from '../../util/MyButton'

//whenever scream dialog is opened, browser will navigate to the scream ID based url
//when the component is closed, the browser will return to the original path saved in the local state
const ScreamDialog = ({screamID, userHandle, classes, commentCount, openDialog}) =>{
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({oldPath: '', newPath: ''})

    const { 
        scream: { body, createdAt, likeCount, userImage, comments }, 
        ui : { loading } 
    } = useSelector(state => ({
        scream: state.data.scream,
        ui: state.ui
    }))

    const dispatch = useDispatch()

    const handleOpen = () => {
        let oldPath = window.location.pathname
        const newPath = `/doges/${userHandle}/scream/${screamID}`
        if(oldPath === newPath) oldPath = `/doges/${userHandle}`
        window.history.pushState(null, null, newPath)
        setOpen(true)
        setState({ oldPath, newPath })
        dispatch(getScream(screamID))
    }

    useEffect(() => {
        openDialog && handleOpen()
    }, [])

    const handleClose = () => {
        window.history.pushState(null, null, state.oldPath)
        dispatch(clearErrors())
        setOpen(false)
    }

    const dialogMarkup = loading ? (
        <div className={classes.spinner}>
            <Helmet>
                <title>Dogeposting / {userHandle}</title>
            </Helmet>
            <CircularProgress size={50} thickness={2}/>
            <p className={classes.loadingText}>Loading...</p>
        </div>
        
    ) : (
        <Grid container spacing={2}>
            <Helmet>
                <title>Dogeposting / {userHandle}</title>
            </Helmet>
            <Grid item >
                <img src={userImage} alt="Profile" className={classes.profileImage}/>
            </Grid>
            <Grid item sm={10}>
                <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/doges/${userHandle}`}
                >@{userHandle}</Typography>
                <hr className={classes.invisibleSeperator}/>
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeperator}/>
                <Typography variant="body1">{body}</Typography>
                <div className="screamStats">
                <LikeButton screamID={screamID} />
                {likeCount > 0 && <span className="stats">{likeCount}</span>}
                <MyButton tip="Comment">
                    <ChatIcon color="primary"/>
                </MyButton>
                {commentCount > 0 && <span className="stats">{commentCount}</span>}
                </div>
            </Grid>
            <CommentForm screamID={screamID} />
            <Comments comments={comments} />
        </Grid>
    )
    return (
        <>
            <MyButton onClick={handleOpen} tip="Comment" >
                <ChatIcon color="primary" />
            </MyButton>
            {commentCount > 0 && <span className="stats">{commentCount}</span>}
            <MyButton onClick={handleOpen} tip="View Details" tipClassName={classes.expandbutton}>
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
        maxHeight: 75,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20,
        overflowX: 'hidden'
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        top: 15
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