import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

const AuthRoute = ({ component: Component, ...rest}) =>{ 
    const state = useSelector(state => ({authenticated: state.user.authenticated}))  

    return ( 
    <Route 
        {...rest} 
        render={(props) => state.authenticated 
        ? <Redirect to="/" /> 
        : <Component {...props} />}
    />
)}

export default AuthRoute
