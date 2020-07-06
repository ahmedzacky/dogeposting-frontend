import React, {useState, useEffect} from 'react'
import Helmet from 'react-helmet'
import AppIcon from './images/dog.svg'

//usehistory
import { useHistory } from "react-router-dom";

//redux
import {useSelector, useDispatch} from 'react-redux'
import { loginUser } from '../Redux/actions/userActions';

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


const Login = ({classes}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        const userData = {email , password}
        dispatch(loginUser(userData, history))

    }

    const handleChange = (e) => {
        if (e.target.name === 'email'){
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const {loading} = state.ui ;
    return (
        <Grid container className={classes.form}>
            <Helmet>
                <title>Dogeposting / Login</title>
            </Helmet>
            <Grid item sm/>
            <Grid item sm>
                <img src={AppIcon} alt="Doge" className={classes.image}/>
                <Typography variant="h1" className={classes.pageTitle}>
                    Login
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
                    Login
                    {loading && <CircularProgress size={30} className={classes.progress}/>}
                    </Button>
                    
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

export default withStyles(styles)(Login)