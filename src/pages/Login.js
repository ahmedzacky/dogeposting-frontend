import React, {useState} from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import AppIcon from './images/dog.svg'
import axios from 'axios'

//mui imports
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles ={
    form: {
        textAlign: 'center'
    },
    image: {
        maxWidth: 80,
        margin: '20px auto'
    },
    pageTitle: {
        fontSize: '30pt',
        margin: '20px auto'
    },
    textField: {
        margin: '20px auto'
    },
    genError: {
        margin: '20px auto',
        color: 'red',
        fontSize: '0.8rem'
    },
    progress: {
        position: 'absolute'
    }
}

//TODOOOOO SETT BIGG WARNING IF AUTH ERROR IS auth/user-not-found OR REDIRECT TO SIGNUPPAGE

const Login = ({classes, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const userData = {email , password}
        axios.post('https://europe-west1-dogeposting-cdbdd.cloudfunctions.net/api/login', userData)
        .then(res => {
            setLoading(false)
            history.push('/')
        })
        .catch(err =>{
            setLoading(false)
            setErrors(err.response.data)
        })

    }
    const handleChange = (e) => {
        if (e.target.name === 'email'){
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }
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
                    Login
                    {loading && <CircularProgress size={30} className={classes.progress}/>}
                    </Button>
                    
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)