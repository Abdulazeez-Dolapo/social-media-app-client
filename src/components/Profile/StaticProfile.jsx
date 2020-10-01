import React, { Fragment } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import { Link } from "react-router-dom"

// Third party Libraries
import dayjs from "dayjs"

// Material UI components
import MuiLink from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"

// Icons
import LocationOn from "@material-ui/icons/LocationOn"
import CalendarToday from "@material-ui/icons/CalendarToday"
import LinkIcon from "@material-ui/icons/Link"

const styles = theme => ({
	...theme.customStyles,
})

const StaticProfile = props => {
	const {
		classes,
		profile: { handle, website, location, createdAt, imageUrl, bio },
	} = props

	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={imageUrl} className="profile-image" alt="profile" />
				</div>

				<div className="profile-details">
					<MuiLink
						component={Link}
						to={`/user/${handle}`}
						variant="h5"
						color="primary"
					>
						@{handle}
					</MuiLink>
					<hr />
					{bio && <Typography variant="body2">{bio}</Typography>}
					<hr />
					{location && (
						<Fragment>
							<LocationOn color="primary" /> <span>{location}</span>
							<hr />
						</Fragment>
					)}
					{website && (
						<Fragment>
							<LinkIcon color="primary" />
							<a
								href={website}
								target="_blank"
								rel="noreferrer noopener"
							>
								{" "}
								{website}
							</a>
							<hr />
						</Fragment>
					)}
					<CalendarToday color="primary" />{" "}
					<span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
				</div>
			</div>
		</Paper>
	)
}

StaticProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StaticProfile)
