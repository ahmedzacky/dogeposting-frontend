import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default ({ component: Component, ...rest}) => { 
    const { authenticated } = useSelector(state => ({authenticated: state.user.authenticated}))  

    return ( 
        <Route 
            {...rest} 
            render={(props) =>(
                authenticated ? <Redirect to="/"/> : <Component {...props}/>
            )}
        />
)}
