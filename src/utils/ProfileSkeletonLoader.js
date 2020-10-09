import React from "react"
import PropTypes from "prop-types"
import BlankImage from "../images/blank.png"

// Material UI components
import Paper from "@material-ui/core/Paper"
import withStyles from "@material-ui/core/styles/withStyles"

// Icons
import LocationOn from "@material-ui/icons/LocationOn"
import CalendarToday from "@material-ui/icons/CalendarToday"
import LinkIcon from "@material-ui/icons/Link"

const styles = theme => ({
	...theme.customStyles,
	handle: {
		width: 60,
		height: 20,
		backgroundColor: theme.palette.primary.main,
		margin: "0 auto 7px auto",
	},
	fullLine: {
		height: 15,
		width: "100%",
		marginBottom: 10,
		backgroundColor: "rgba(0,0,0,0.6)",
	},
	halfLine: {
		height: 15,
		width: "50%",
		marginBottom: 10,
		backgroundColor: "rgba(0,0,0,0.6)",
	},
})

const ProfileSkeletonLoader = props => {
	const { classes } = props

	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={BlankImage} alt="Profile" className="profile-image" />
				</div>

				<hr />

				<div className="profile-details">
					<div className={classes.handle}></div>
					<hr />
					<div className={classes.fullLine}></div>
					<div className={classes.fullLine}></div>
					<hr />
					<LocationOn color="primary" /> <span>Location</span>
					<hr />
					<LinkIcon color="primary" />
					https://website.com
					<hr />
					<CalendarToday color="primary" />
					Joined date
					<hr />
				</div>
			</div>
		</Paper>
	)
}

ProfileSkeletonLoader.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileSkeletonLoader)
