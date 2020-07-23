import React, { useState, useEffect } from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Textfield from '@material-ui/core/Textfield'

import { useSelector, useDispatch } from 'react-redux'
import { submitComment } from '../../Redux/actions/dataActions'


const CommentForm = ({screamID, classes}) =>{
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState({})

    const { ui, authenticated } = useSelector(state => ({
        ui: state.ui,
        authenticated: state.user.authenticated
    }))

    const handleChange = (e) => {
        setBody(e.target.value)
    }

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitComment(screamID, { body }))
        setBody('')
    }

    useEffect(()=> {
        if(ui.errors){
            setErrors(ui.errors)
        }
    }, [ui.errors])

    return (
        authenticated && (
            <Grid item sm={12} className={classes.commentForm}>
                <form method="POST" onSubmit={handleSubmit}>
                    <Textfield
                        name="body"
                        type="text"
                        label="Comment"
                        error={errors && errors.comment ? true : false}
                        helperText={errors && errors.comment}
                        value={body}
                        onChange={handleChange}
                        fullWidth
                        className={classes.textField}
                        autoComplete="off"

                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}>Submit</Button>
                </form>
            </Grid>
        )
    )
}

const styles = theme => ({
    ...theme.spreadThis,
    commentForm: {
        textAlign: 'center'
    }
})

export default withStyles (styles)(CommentForm)
