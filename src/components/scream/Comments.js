import React, { Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const Comments = ({comments, classes}) => {
    return (
        <Grid container>
            {comments.map((comment, i) => {
                const {body, createdAt, userImage, userHandle} = comment;
                return(
                    <Fragment key={createdAt}>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img src={userImage} alt="Comment" className={classes.commentImage}/>
                                </Grid>
                                <Grid item>
                                    <div className={classes.commentData}>
                                        <Typography
                                            variant="h5"
                                            component={Link}
                                            to={`users/${userHandle}`}
                                            color="primary">@{userHandle}</Typography>
                                        <Typography variant="body 2" color="textSecondary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invisibleSeperator} />
                                        <Typography variant="body1">{body}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {i !== comments.length -1 && <hr className={classes.visibleSeperator}/>}
                    </Fragment>
                )
            })}
        </Grid>
    )
}

const styles = theme=> ({
    ...theme.spreadthis,
    commentImage: {
        maxWidth: '100%',
        height: 75,
        objectFit: 'cover',
        borderRaduis: '50%'
    },
    commentData: {
        marginLeft: 20
    }
    
})

export default withStyles (styles)(Comments)
