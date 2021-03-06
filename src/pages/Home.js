import React, {useEffect} from 'react'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { getScreams } from '.././Redux/actions/dataActions'
import Grid from '@material-ui/core/Grid'

import Scream from '../components/scream/Scream'
import Profile from '../components/profile/Profile'

import ScreamSkeleton from './../util/ScreamSkeleton'

const Home = () => {
    const state = useSelector(state => ({ data: state.data }))
    const { screams, loading } = state.data

    const dispatch = useDispatch()

    useEffect(() => dispatch(getScreams()), [])

    let recentScreams = !loading ?
    (screams.map(scream => <Scream key={scream.screamID} scream={scream}/>))
    : (<ScreamSkeleton />)

    return (
        <Grid container spacing={4}>
            <Helmet>
                <title>Dogeposting / Home</title>
            </Helmet>
            <Grid item sm={8} xs={12}>
                {recentScreams}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>     
        </Grid>
    )
}

export default Home
