import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import MyButton from '../util/MyButton';


//MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

import PostScream from './PostScream'
const Navbar = () => {
    const state = useSelector(state => ({
        authenticated: state.user.authenticated
    }))
    const { authenticated } = state
    return (
        <AppBar>
            <Toolbar className="nav-container">
            {authenticated ? (
                <Fragment>
                    <PostScream />
                    <Link to="/">
                        <MyButton tip="Home">
                            <HomeIcon />
                        </MyButton>
                    </Link>
                    <MyButton tip="Notifications">
                        <Notifications />
                    </MyButton>
                </Fragment>
            ) 
            : (
                <Fragment>
                    <Button color="inherit" component={Link}  to="/login">Login</Button>
                    <Button color="inherit" component={Link}  to="/">Home</Button>
                    <Button color="inherit" component={Link}  to="/signup">Signup</Button> 
                </Fragment>
            )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
