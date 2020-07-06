import React, {useState, useEffect} from 'react'
import Helmet from 'react-helmet'
import axios from 'axios'

import Grid from '@material-ui/core/Grid'

import Scream from '../components/Scream'
import Profile from '../components/Profile'

const Home = () => {
    const [screams, setScreams] = useState()
    const fetchAllScreams = async () => {
        const resScreams = await axios.get('/screams')
        setScreams(resScreams.data)
    }
    useEffect(() => {
        (async() => {
            await fetchAllScreams()
        })()
    }, [])
    let recentScreams = screams ?
    screams.map(scream => <Scream key={scream.screamID} scream={scream}/>)
    : <p>Loading...</p>
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
