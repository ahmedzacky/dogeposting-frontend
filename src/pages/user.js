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
    const [screamParam, setScreamParam] = useState(null)

    const { data:{ screams, loading } } = useSelector(state => ({ data: state.data }));

    const dispatch = useDispatch();
    const match = useRouteMatch();

    const handle = match.params.handle
    const screamID = match.params.screamID


    useEffect(()=> {
        screamID && setScreamParam(screamID)
        dispatch(getUserData(handle))
        axios.get(`/user/${handle}`).then(res=> setProfile(res.data.user))
    },[])

    const screamsMarkup = loading ? (
        <p>Loading data...</p>
    ) : screams === null ? (
        <p>No screams from this user</p>
    ) : !screamParam ? (
        screams.map(scream => <Scream key={scream.screamID} scream={scream}/> )
    ) : (
        screams.map(scream => {
            if (scream.screamID !== screamParam) {
                return (<Scream key={scream.screamID} scream={scream} openDialog={false}/> )
            } else return (<Scream key={scream.screamID} scream={scream} openDialog={true}/> )
        })
    )

    return (
        <Grid container spacing={4}>
        <Helmet>
            <title>Dogeposting / {handle}</title>
        </Helmet>
        <Grid item sm={8} xs={12}>
            {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
            {Object.keys(profile).length === 0 ? <p>Loading...</p> : <StaticProfile profile={profile} />}
        </Grid>     
    </Grid>
    )
}

export default User
