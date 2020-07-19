import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
//redux
import {useSelector, useDispatch} from 'react-redux'
import {uploadImage, logoutUser} from '../Redux/actions/userActions'

//mui imports
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip';

//icons
import EditIcon from '@material-ui/icons/Edit'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import EditDetails from './EditDetails'


const styles = (theme) => ({
    tooltip: {
        margin: 20,
        padding: 10,

    },
    paper: {
        padding: '20px 10px'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: "50%"
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                verticalAlign: 'middle'
                },
                '& a': {
                '&:hover': {textDecoration: 'none'},
                color: theme.palette.primary.main
            }
            },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px'
        }
    }
})

const Profile = ({classes}) => {
    const state = useSelector(state => ({user: state.user}))
    const {
        credentials: {
            imageUrl, 
            handle, 
            bio, 
            location, 
            website, 
            createdAt
        }, loading, authenticated
    } = state.user

    const dispatch = useDispatch()

    
    const handleImageChange = event => {
        const image = event.target.files[0]
        const formData = new FormData();
        formData.append('image',  image, image.name)
        dispatch(uploadImage(formData))

    }

    //very smart
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    let profieMarkup = !loading? ( authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img className="profile-image" src={imageUrl} alt="profile"/>
                    <input type="file" hidden="hidden" id="imageInput" onChange={handleImageChange}/>
                    <Tooltip title="Edit bro pic" placement="top-end" className={classes.tooltip}>
                        <IconButton onClick={handleEditPicture}>
                            <EditIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                </div>
                <hr/>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/doges/${handle}`} color="primary" variant="h5">
                    @{handle}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <Fragment>
                            <LocationOn color="primary"/><span>{location}</span>
                            <hr/>
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary"/>
                            <a href={website} target="_blank" rel="noopener noreferrer"> {website}</a>
                            <hr/> 
                        </Fragment>
                    )}
                    <CalendarToday color="primary" />
                    <span> Joined {dayjs(createdAt).format(`DD MMM YYYY`)}</span>
                </div>
                <Tooltip title="Logout" placement="top-end">
                    <IconButton onClick={handleLogout}>
                        <KeyboardReturn color="primary"/>
                    </IconButton>
                </Tooltip>
                <EditDetails/>
            </div>
        </Paper>
    ) : (
        <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
                You're not signed in
            </Typography>
            <div className={classes.buttons}>
                <Button variant="contained" color="primary" component={Link} to={'/login'}>
                    Login
                </Button>
                <Button variant="contained" color="primary" component={Link} to={'/signup'}>
                    Signup
                </Button>
            </div>
           
        </Paper>
    )) : (<p>Loading...</p>)
    
    return (
        <div>
           {profieMarkup}
        </div>
    )
}

export default withStyles(styles)(Profile);
