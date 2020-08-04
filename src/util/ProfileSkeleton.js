import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import NoImg from '.././pages/images/dog.svg'
// MUI
import Paper from '@material-ui/core/Paper'
// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'

const ProfileSkeleton = ({ classes }) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
          <img src={NoImg} alt="profile" className="profile-image" />
          <div className="profile-details">
            <div><LocationOn color="primary" /> <span>Location</span></div>
            <div> <LinkIcon color="primary" /> https://website.com</div>
            <div><CalendarToday color="primary" /> Joined date</div>
          </div>
      </div>
    </Paper>
  )
}

const styles = (theme) => ({
    ...theme.spreadThis,
    handle: {
      height: 20,
      backgroundColor: theme.palette.primary.main,
      width: 60,
      margin: '0 auto 7px auto',
      textAlign: 'center'
    },
    fullLine: {
      height: 15,
      backgroundColor: 'rgba(0,0,0,0.6)',
      width: '100%',
      marginBottom: 10
    },
    halfLine: {
      height: 15,
      backgroundColor: 'rgba(0,0,0,0.6)',
      width: '50%',
      marginBottom: 10
    },
    paper: {
      padding: 10
    }
})
  

export default withStyles(styles)(ProfileSkeleton)
