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

const theme = createMuiTheme({
	palette: {
	  primary: {
		light: '#74b9ff',
		main: '#ff7043',
		dark: '#6c5ce7',
		contrastText: '#fffde7'
	  },
	  secondary: {
		light: '#fdcb6e',
		main: '#e17055',
		dark: '#d63031',
		contrastText: '#dfe6e9'
	  },
	},
  })

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<div className="App">
			<Router>
			<Navbar/>
			<div className="container">
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/signup" component={signup}/>
			</Switch>
			</div>
			</Router>
			</div>
		</MuiThemeProvider>
	);
}

export default App;
