import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

//MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'



import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

import MyButton from '../util/MyButton';
import PostScream from './PostScream'

const styles = {
    title: {
        flexGrow: 1
    }
}

const Navbar = ({ classes }) => {
    const state = useSelector(state => ({
        authenticated: state.user.authenticated
    }))
    const { authenticated } = state
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Dogeposting
                </Typography>
            {authenticated ? (
                <div className="nav-container">
                    <PostScream />
                    <Link to="/">
                        <MyButton tip="Home">
                            <HomeIcon />
                        </MyButton>
                    </Link>
                    <MyButton tip="Notifications">
                        <Notifications />
                    </MyButton>
                </div>
            ) 
            : (
                <div className="nav-container"> 
                    <Button color="inherit" component={Link}  to="/login">Login</Button>
                    <Button color="inherit" component={Link}  to="/">Home</Button>
                    <Button color="inherit" component={Link}  to="/signup">Signup</Button> 
                </div>
            )}
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(Navbar);
