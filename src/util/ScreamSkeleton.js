import React from 'react'
import NoImg from '.././pages/images/dog.svg'
// MUI
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

import withStyles from '@material-ui/core/styles/withStyles'

const ScreamSkeleton = ({ classes } ) => {
  const content = Array.from({ length: 3 }).map((_item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ))

  return <>{content}</>
}

const styles = (theme) => ({
    ...theme.spreadThis,
    card: {
      display: 'flex',
      marginBottom: 20
    },
    cardContent: {
      width: '100%',
      flexDirection: 'column',
      padding: 25
    },
    cover: {
      minWidth: 60,
      marginTop: 15,
      maxHeight: 60,
      marginLeft: 5,
      borderRadius: '50%'
    },
    handle: {
      width: 60,
      height: 18,
      backgroundColor: theme.palette.primary.main,
      marginBottom: 7
    },
    date: {
      height: 14,
      width: 100,
      backgroundColor: 'rgba(0,0,0, 0.3)',
      marginBottom: 10
    },
    fullLine: {
      height: 15,
      width: '90%',
      backgroundColor: 'rgba(0,0,0, 0.6)',
      marginBottom: 10
    },
    halfLine: {
      height: 15,
      width: '50%',
      backgroundColor: 'rgba(0,0,0, 0.6)',
      marginBottom: 10
    }
})


export default withStyles(styles)(ScreamSkeleton)