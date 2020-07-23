import React,{ useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import axios from 'axios'
import Scream from '../components/scream/Scream'
import Grid from '@material-ui/core/Grid'
import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getUserData } from '../Redux/actions/dataActions'
import StaticProfile from '../components/profile/StaticProfile'

const User = () => {
    const [profile, setProfile] = useState({})

    const { data:{ screams, loading } } = useSelector(state => ({
        data: state.data
    }));

    const dispatch = useDispatch();
    const match = useRouteMatch();
    const handle = match.params.handle

    useEffect(()=> {
        dispatch(getUserData(handle))
        axios.get(`/user/${handle}`).then(res=> setProfile(res.data.user))
    },[])

    const screamsMarkup = loading ? (
        <p>Loading data...</p>
    ) : screams === null ? (
        <p>No screams from this user</p>
    ) : screams.map(scream => <Scream key={scream.screamID} scream={scream}/>)

    return (
        <Grid container spacing={4}>
        <Helmet>
            <title>Dogeposting / {handle}</title>
        </Helmet>
        <Grid item sm={8} xs={12}>
            {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
            {profile === null ? <p>Loading...</p> : <StaticProfile profile={profile} />}
        </Grid>     
    </Grid>
    )
}

export default User
