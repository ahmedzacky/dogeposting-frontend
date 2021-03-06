import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

//MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

//icons
import HomeIcon from '@material-ui/icons/Home';

//components
import MyButton from '../../util/MyButton';
import PostScream from '../scream/PostScream'
import Notifications from './Notifications';


const Navbar = ({ classes }) => {
    const state = useSelector(state => ({
        authenticated: state.user.authenticated
    }))
    const { authenticated } = state
    return (
        <AppBar>
            <Toolbar>
            {authenticated ? (
                <div className="nav-container">
                    <PostScream />
                    <Link to="/">
                        <MyButton tip="Home">
                            <HomeIcon />
                        </MyButton>
                    </Link>
                    <Notifications />
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


export default (Navbar);
