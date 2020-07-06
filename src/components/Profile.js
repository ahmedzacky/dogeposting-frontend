import React from 'react'

//redux
import {useSelector} from 'react-redux'

//mui imports
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'


const styles = theme => ({
    ...theme.spreadThis
})

const Profile = ({classes}) => {
    const state = useSelector(state => ({user: state.user}))
    const { 
        user: {
        credentials : {handle, createdAt, imageUrl, bio, website, location},
        loading
        }
    } = state.user
    return (
        <div>
            {console.log(state)}
        </div>
    )
}

export default withStyles(styles)(Profile);
