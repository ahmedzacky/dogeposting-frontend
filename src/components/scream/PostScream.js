import React, {useState, useEffect} from 'react'
import MyButton from '../../util/MyButton'

//mui
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from "@material-ui/core/CircularProgress"

//icon
import AddIcon from "@material-ui/icons/Add"
import CloseIcon from "@material-ui/icons/Close"

//redux
import {useSelector, useDispatch} from 'react-redux'
import { postScream, clearErrors } from '../../Redux/actions/dataActions'

const PostScream = ({ classes }) =>{
    const [open, setOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState({})

    const { ui } = useSelector(state => ({ui : state.ui}))
    const { loading } = ui 
    const dispatch = useDispatch()

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        dispatch(clearErrors())
        setOpen(false)
        setErrors({})
    }

    const handleChange = (e) => {
        setBody(e.target.value)
    }

    //dispatch an object to be posted : {body : body}
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true)
        dispatch(postScream({body}))
        setSubmitting(false)
    }

    useEffect(()=> {
        if(ui.errors){
            setErrors(ui.errors)
        }
        if(!ui.errors && !loading){
            setBody('')
            setOpen(false)
            setErrors({})
        }
    }, [ui.errors, loading])

    return (
        <>
            <MyButton onClick={handleOpen} tip="Screamm!!">
                <AddIcon />
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <MyButton 
                    tip="Close" 
                    onClick={handleClose} 
                    tipClassName={classes.closeButton}
                >
                    <CloseIcon />
                </MyButton>
                <DialogTitle>SCREEAAAMMMM!!!</DialogTitle>
                <DialogContent>
                    <form method="POST" onSubmit={handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="SCREAAM!!"
                            multiline
                            rows="3"
                            error={errors && errors.body ? true : false}
                            disabled={submitting}
                            helperText={errors && errors.body}
                            className={classes.textField}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                className={classes.submitButton}
                                disabled={loading}
                            > 
                                Submit

                            {loading &&
                                <CircularProgress 
                                className={classes.progressSpinner} 
                                /> 
                                
                            }
                            </Button>                        
                        
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
        position: "relative",
        float: "right",
        marginTop: 10
    },
    progressSpinner: {
        margin: 'auto'
    },
    closeButton :{
        position: 'absolute',
        left: '90%',
        top: '6%'
    }
    
})

export default withStyles(styles)(PostScream);
