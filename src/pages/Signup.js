import React, {useState, useEffect} from 'react'
import Helmet from 'react-helmet'
import AppIcon from './images/dog.svg'

//usehistory
import { useHistory } from "react-router-dom";

//redux
import {useSelector, useDispatch} from 'react-redux'
import { signupUser } from '../Redux/actions/userActions';

//mui imports
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'


const styles = theme => ({
    ...theme.spreadThis
})


const Signup = ({classes}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [handle, setHandle] = useState('')
    const [errors, setErrors] = useState({})

    let history = useHistory();

    const state = useSelector(state => ({
        user: state.user,
        ui: state.ui
    }))

    //setting local errors object on global errors change
    useEffect(() => {
        setErrors(state.ui.errors);
    }, [state.ui.errors])

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUserData = {email , password, confirmPassword, handle}
        dispatch(signupUser(newUserData, history))
    }

    // i am very clever programmer no package needed
    const handleChange = (e) => {
        switch(e.target.name){
            case 'email' :
                setEmail(e.target.value)
                break;
            case 'password' : 
                setPassword(e.target.value)
                break;
            case 'confirmPassword' : 
                setconfirmPassword(e.target.value)
                break;
            case 'handle' :
                setHandle(e.target.value)
                break;
            default : 
                break;    
        }
    }

    const {loading} = state.ui;
    return (
        <Grid container className={classes.form}>
            <Helmet>
                <title>Dogeposting / Signup</title>
            </Helmet>
            <Grid item sm/>
            <Grid item sm>
                <img src={AppIcon} alt="Doge" className={classes.image}/>
                <Typography variant="h1" className={classes.pageTitle}>
                    Signup
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField 
                        id="email" 
                        name="email" 
                        type="email"
                        label="Email"
                        helperText={errors && errors.email}
                        error={errors && errors.email ? true : false}
                        className={classes.textField}
                        value={email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField 
                        id="password" 
                        name="password" 
                        type="password"
                        label="Password"
                        helperText={errors && errors.password}
                        error={errors && errors.password ? true : false}
                        className={classes.textField}
                        value={password}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password"
                        label="Confirm Password"
                        helperText={errors && errors.confirmPassword}
                        error={errors && errors.confirmPassword ? true : false}
                        className={classes.textField}
                        value={confirmPassword}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField 
                        id="handle" 
                        name="handle" 
                        type="text"
                        label="Handle"
                        helperText={errors && errors.handle}
                        error={errors && errors.handle ? true : false}
                        className={classes.textField}
                        value={handle}
                        onChange={handleChange}
                        fullWidth
                    />
                    {errors && errors.general && (
                        <Typography variant="body2" className={classes.genError}>
                        {errors.general}
                        </Typography>
                    )}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        className={classes.button}
                        disabled={loading}
                    >
                    Signup
                    {loading && <CircularProgress size={30} className={classes.progress}/>}
                    </Button>
                    
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

export default withStyles(styles)(Signup)