import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//mui
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

//Icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { markNotificationsRead } from './../../Redux/actions/userActions'

const Notifications = () => {
    const [anchor, setAnchor] = useState(null)
    const { notifications } = useSelector(state => ({notifications: state.user.notifications}))
    const dispatch = useDispatch()
    dayjs.extend(relativeTime)

    const handleOpen = (e) => {
        setAnchor(e.target)
    }

    const handleClose = () => {
        setAnchor(null)
    }

    const onMenuOpened = () => {
        let unreadNotificationIDs = 
            notifications.filter(notification => !notification.read).map(notification => notification.notificationID)
        dispatch(markNotificationsRead(unreadNotificationIDs))
    }

    let notificationsIcon
    if (notifications && notifications.length > 0){
        let notificationsLength = notifications.filter(notification => notification.read === false).length
        notificationsLength > 0 
        ? (notificationsIcon = (
            <Badge badgeContent={notificationsLength} color="secondary">
                <NotificationsIcon/>
            </Badge>
        )) : (notificationsIcon =  <NotificationsIcon/>)
    } else {
        notificationsIcon =  <NotificationsIcon/>
    }

    let notificationsMarkup = notifications && notifications.length > 0 ? (
        notifications.map(notification => {
            const verb = notification.type === 'like' ? 'liked' : 'commented on';
            const time = dayjs(notification.createdAt).fromNow()
            const iconColor = notification.read ? 'primary' : 'secondary'
            const icon = notification.type === 'like' ? (
                <FavoriteIcon color={iconColor} style={{marginRight:10}} />
            ) : (<ChatIcon color={iconColor} style={{marginRight:10}} /> )
            return (
                <MenuItem 
                    key={notification.notificationID}
                    onClick={handleClose}
                >
                {icon}
                    <Typography
                        component={Link}
                        color="primary"
                        variant="body1"
                        to={`/doges/${notification.recepient}/scream/${notification.screamID}`}
                    >
                    {`${notification.sender} ${verb} your scream ${time}`}
                    </Typography>
                </MenuItem>
            )
        })
    ) : (
        <MenuItem onClick={handleClose}>
            No Notifications yet
        </MenuItem>
    )

    return(
        <>
            <Tooltip placement="top" title="Notifications">
                <IconButton
                    aria-owns={anchor? 'simple-menu': undefined}
                    aria-haspopup="true"
                    onClick={handleOpen}>{notificationsIcon}</IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={handleClose}
                onExit={onMenuOpened}
            >{notificationsMarkup}</Menu>
        </>
    )

}

export default Notifications