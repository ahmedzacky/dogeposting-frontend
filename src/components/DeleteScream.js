import React, {Fragment, useState} from 'react'
import MyButton from '.././util/MyButton'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

import {deleteScream} from '../Redux/actions/dataActions'
import {useDispatch} from 'react-redux'


const styles = {
    deleteButton: {
        position: 'absolute',
        top: 18,
        right: 10,
        color: 'red'
    }
}

 const DeleteScream =({screamID, classes}) => {
     const [open, setOpen] = useState(false)
     const dispatch = useDispatch()

     const handleOpen = () => setOpen(true)
     const handleClose = () => setOpen(false)

     const toDeleteScream = () => {
         dispatch(deleteScream(screamID))
         setOpen(false)
     }
        return (
            <Fragment>
                <MyButton 
                    tip="Delete" 
                    onClick={handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteOutline/>
                </MyButton>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Are ya winning son
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={toDeleteScream} color="secondary">Winning</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
}

export default withStyles(styles)(DeleteScream)
