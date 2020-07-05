import React, {useState} from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import AppIcon from './images/dog.svg'
import axios from 'axios'

//usehistory
import { useHistory } from "react-router-dom";


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

//TODOOOOO SETT BIGG WARNING IF AUTH ERROR IS auth/user-not-found OR REDIRECT TO SIGNUPPAGE

const Signup = ({classes}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [handle, setHandle] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const newUserData = {email , password, confirmPassword, handle}
        console.table(newUserData)
        axios.post('https://europe-west1-dogeposting-cdbdd.cloudfunctions.net/api/signup', newUserData)
        .then(res => {
            setLoading(false)
            localStorage.setItem('DgIdToken', `Bearer ${res.data.token}`)
            history.push('/')
        })
        .catch(err =>{
            setLoading(false)
            console.error(err.response.data)
            setErrors(err.response.data)
        })

    }

    // i am very clever programmer no package needed
    const handleChange = (e) => {
        // eslint-disable-next-line default-case
        switch(e.target.name){
            case 'email' :
                setEmail(e.target.value)
                break
            case 'password' : 
                setPassword(e.target.value)
                break
            
            case 'confirmPassword' : 
                setconfirmPassword(e.target.value)
                break
            
            case 'handle' :
                setHandle(e.target.value)
                break     
    }
}


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
                        helperText={errors.email}
                        error={errors.email ? true : false}
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
                        helperText={errors.password}
                        error={errors.password ? true : false}
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
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
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
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        className={classes.textField}
                        value={handle}
                        onChange={handleChange}
                        fullWidth
                    />
                    {errors.general && (
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

Signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)