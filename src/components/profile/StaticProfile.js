import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
//mui
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
//icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'


const StaticProfile = ({profile,classes}) => {
    const { handle, createdAt, imageUrl, bio, website, location } = profile
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img className="profile-image" src={imageUrl} alt="profile"/>
                </div>
                <hr/>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/doges/${handle}`} color="primary" variant="h5">
                    @{handle}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <>
                            <LocationOn color="primary"/><span>{location}</span>
                            <hr/>
                        </>
                    )}
                    {website && (
                        <>
                            <LinkIcon color="primary"/>
                            <a href={website} target="_blank" rel="noopener noreferrer"> {website}</a>
                            <hr/> 
                        </>
                    )}
                    <CalendarToday color="primary" />
                    <span> Joined {dayjs(createdAt).format(`DD MMM YYYY`)}</span>
                </div>
            </div>
        </Paper>
    )
}

const styles = (theme) => ({
    tooltip: {
        margin: 20,
        padding: 10,

    },
    paper: {
        padding: '20px 10px'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: "50%"
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                verticalAlign: 'middle'
                },
                '& a': {
                '&:hover': {textDecoration: 'none'},
                color: theme.palette.primary.main
            }
            },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        }
    }
})

export default withStyles(styles)(StaticProfile);
