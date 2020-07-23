import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//pages
import Home from './pages/home' 
import Login from './pages/login' 
import Signup from './pages/signup' 
import User from './pages/user' 

//util
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import AuthRoute from './util/AuthRoute'

//redux
import {Provider} from 'react-redux'
import store from './Redux/store'
import { SET_AUTHENTICATED } from './Redux/types'
import {logoutUser, getUserData} from './Redux/actions/userActions'
import Axios from 'axios';

const theme = createMuiTheme(themeFile)

const token = localStorage.DgIdToken
if(token){
	const decoded = jwtDecode(token)
	if(decoded.exp * 1000 < Date.now()){
		store.dispatch(logoutUser())	
		window.location.href = '/login';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		Axios.defaults.headers.common['Authorization'] = token
		store.dispatch(getUserData())
	}
}

const App = () => {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<div className="App">
					<Router>
						<Navbar/>
						<div className="container">
							<Switch>
								<Route exact path="/" component={Home}/>
								<AuthRoute exact path="/login" component={Login} />
								<AuthRoute exact path="/signup" component={Signup} />
								<Route exact path="/doges/:handle" component={User} />
							</Switch>
						</div>
					</Router>
				</div>
			</Provider>
		</MuiThemeProvider>
	);
}

export default App;
