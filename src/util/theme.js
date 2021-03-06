export default {
	palette: {
		type: 'dark',
		primary: {
			light: '#74b9ff',
			main: '#FFA73C',
			dark: '#6c5ce7',
			contrastText: '#fffde7'
		},
		secondary: {
			light: '#fdcb6e',
			main: '#e17055',
			dark: '#d63031',
			contrastText: '#fffde7'
		}
		
	},
	spreadThis: {
		typography: {
			useNextVariants: true
		},
		form: {
			textAlign: 'center'
		},
		image: {
			maxWidth: 80,
			margin: '20px auto'
		},
		pageTitle: {
			fontSize: '30pt',
			margin: '20px auto',
			color: '#FFF'
		},
		textField: {
			margin: '7px auto'
		},
		genError: {
			margin: '10px auto',
			color: 'red',
			fontSize: '0.8rem'
		},
		progress: {
			position: 'absolute'
		},
		button : {
			marginTop: 10
		},
		invisibleSeperator: {
			border: 'none',
			margin: 3
		},
		visibleSeperator: {
			width: '100%',
			borderBottom: '1px solid rgba(0,0,0,0.1)',
			marginBottom: 15
		}
	}	
}