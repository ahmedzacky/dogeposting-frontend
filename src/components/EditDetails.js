import React, {useState, useEffect, Fragment} from 'react'

//mui
import withStyles from '@material-ui/core/styles/withStyles'
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton"

//icon
import EditIcon from "@material-ui/icons/Edit"

//redux
import {useSelector, useDispatch} from 'react-redux'
import {editUserDetails} from '../Redux/actions/userActions'

const styles = (theme) => ({
    ...theme.spreadThis
})

const EditDetails = ({ classes }) =>{
    const [bio, setBio] = useState('')
    const [website, setWebsite] = useState('')
    const [location, setLocation] = useState('')
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()

    const state = useSelector(state => ({
        credentials: state.user.credentials
    }))

    const mapDetailstoState = (credentials) => {
        setBio(credentials.bio? credentials.bio: '')
        setWebsite(credentials.website? credentials.website: '')
        setLocation(credentials.location? credentials.location: '')
    }

    useEffect(() => {
        const credentials = state.credentials;
        mapDetailstoState(credentials);
    }, [])

    console.log(state.credentials)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
        mapDetailstoState(state.credentials)
    }

    const handleChange = (e) => {
        switch(e.target.name){
            case 'bio' :
                setBio(e.target.value)
                break;
            case 'website' : 
                setWebsite(e.target.value)
                break;
            case 'location' : 
                setLocation(e.target.value)
                break;
            default : 
                break;    
        }
    }

    const handleSubmit = () => {
        const userDetails  = { bio, website, location}
        dispatch(editUserDetails(userDetails))
        handleClose()
    }

    return (
        <Fragment>
            <Tooltip title="Edit details" placement="top-end">
                <IconButton onClick={handleOpen} className={classes.button}>
                    <EditIcon color="primary"/>
                </IconButton>
            </Tooltip>
            <Dialog 
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            >
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                        name="bio"
                        type="text"
                        label="Bio"
                        multiline
                        rows="3"
                        placeholder="A short bio about your benis 😁"
                        className={classes.textField}
                        value={bio}
                        onChange={handleChange}
                        fullWidth
                        />
                        <TextField
                        name="website"
                        type="text"
                        label="Website"
                        multiline
                        rows="3"
                        placeholder="A short website about your benis 😁"
                        className={classes.textField}
                        value={website}
                        onChange={handleChange}
                        fullWidth
                        />
                        <TextField
                        name="location"
                        type="text"
                        label="Location"
                        multiline
                        rows="3"
                        placeholder="A short location about your benis 😁"
                        className={classes.textField}
                        value={location}
                        onChange={handleChange}
                        fullWidth
                        />


                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default withStyles(styles)(EditDetails);
