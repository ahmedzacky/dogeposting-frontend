import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//pages
import Home from './pages/home' 
import Login from './pages/login' 
import signup from './pages/signup' 

//util
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import AuthRoute from './util/AuthRoute'

const theme = createMuiTheme(themeFile)

const token = localStorage.DgIdToken
let authenticated
if(token){
	const decoded = jwtDecode(token)
	if(decoded.exp * 1000 < Date.now()){
		window.location.href = '/login'
		authenticated = false
	} authenticated = true
}

console.log(authenticated)

const App = () => {
	return (
		<MuiThemeProvider theme={theme}>
			<div className="App">
			<Router>
			<Navbar/>
			<div className="container">
			<Switch>
				<Route exact path="/" component={Home}/>
				<AuthRoute exact path="/login" component={Login} authenticated={authenticated}/>
				<AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
			</Switch>
			</div>
			</Router>
			</div>
		</MuiThemeProvider>
	);
}

export default App;
