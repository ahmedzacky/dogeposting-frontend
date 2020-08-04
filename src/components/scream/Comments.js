import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
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
                                <Grid item>
                                    <img src={userImage} alt="Comment" className={classes.commentImage}/>
                                </Grid>
                                <Grid item sm={10}>
                                    <div className={classes.commentData}>
                                        <Typography
                                            component={Link}
                                            to={`/doges/${userHandle}`}
                                            variant="h6"
                                            color="primary">{userHandle}</Typography>
                                        <Typography variant="body2" color="textSecondary">
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
    ...theme.spreadThis,
    commentImage: {
        maxWidth: 50,
        height: 50,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    }
    
})

export default withStyles (styles)(Comments)
