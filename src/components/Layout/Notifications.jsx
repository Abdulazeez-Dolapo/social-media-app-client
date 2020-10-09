import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

// Third party Libraries
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

// Material UI components
import Badge from "@material-ui/core/Badge"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"

// Icons
import NotificationsIcon from "@material-ui/icons/Notifications"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ChatIcon from "@material-ui/icons/Chat"

// Redux
import { connect } from "react-redux"
import {
	markNotificationsAsRead,
	getUserNotifications,
} from "../../redux/actions/userActions"

export class Notifications extends Component {
	constructor(props) {
		super(props)

		setInterval(() => {
			this.props.getUserNotifications()
		}, 10000)
	}

	state = {
		anchorElement: null,
		timer: null,
	}

	handleOpen = event => {
		this.setState({ anchorElement: event.target })
	}

	handleClose = () => {
		this.setState({ anchorElement: null })
		this.markAsRead()
	}

	markAsRead = () => {
		const unreadNotificationsIds = this.props.notifications
			.filter(notification => !notification.read)
			.map(notification => notification.id)

		this.props.markNotificationsAsRead(unreadNotificationsIds)
	}

	render() {
		dayjs.extend(relativeTime)

		const { notifications } = this.props
		const { anchorElement } = this.state

		let notificationIcon
		if (notifications?.length > 0) {
			const unreadNotifications = notifications.filter(
				notification => !notification.read
			)

			unreadNotifications.length > 0
				? (notificationIcon = (
						<Badge
							badgeContent={unreadNotifications.length}
							color="secondary"
						>
							<NotificationsIcon />
						</Badge>
				  ))
				: (notificationIcon = <NotificationsIcon />)
		} else {
			notificationIcon = <NotificationsIcon />
		}

		const notificationsMarkup =
			notifications?.length > 0 ? (
				notifications.map(notification => {
					const verb =
						notification.type === "like" ? "liked" : "commented on"
					const time = dayjs(notification.createdAt).fromNow()
					const iconColor = notification.read ? "primary" : "secondary"
					const icon =
						notification.type === "like" ? (
							<FavoriteIcon
								color={iconColor}
								style={{ marginRight: 10 }}
							/>
						) : (
							<ChatIcon color={iconColor} style={{ marginRight: 10 }} />
						)

					return (
						<MenuItem key={notification.id} onClick={this.handleClose}>
							{icon}
							<Typography
								component={Link}
								variant="body1"
								to={`/user/${notification.recipient}/tweet/${notification.tweetId}`}
								color="inherit"
							>
								{notification.sender} {verb} your tweet {time}
							</Typography>
						</MenuItem>
					)
				})
			) : (
				<MenuItem onClick={this.handleClose}>
					You have no unread notifications
				</MenuItem>
			)

		return (
			<Fragment>
				<Tooltip placement="top" title="Notifications">
					<IconButton
						aria-owns={anchorElement ? "simple-menu" : undefined}
						aria-haspopup="true"
						onClick={this.handleOpen}
					>
						{notificationIcon}
					</IconButton>
				</Tooltip>

				<Menu
					anchorEl={anchorElement}
					open={Boolean(anchorElement)}
					onClose={this.handleClose}
					// onEntered={this.onMenuOpened}
				>
					{notificationsMarkup}
				</Menu>
			</Fragment>
		)
	}
}

Notifications.propTypes = {
	markNotificationsAsRead: PropTypes.func.isRequired,
	getUserNotifications: PropTypes.func.isRequired,
	notifications: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
	notifications: state.user.notifications,
})

const mapActionToProps = {
	markNotificationsAsRead,
	getUserNotifications,
}

export default connect(mapStateToProps, mapActionToProps)(Notifications)
