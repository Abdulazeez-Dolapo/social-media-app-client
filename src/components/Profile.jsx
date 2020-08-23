import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

// Material UI
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import MuiLink from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

// Icons
import LocationOn from "@material-ui/icons/LocationOn"
import CalendarToday from "@material-ui/icons/CalendarToday"
import LinkIcon from "@material-ui/icons/Link"

// Redux
import { connect } from "react-redux"

const styles = theme => ({
	...theme.customStyles,
})

class Profile extends Component {
	render() {
		const {
			classes,
			user: {
				credentials: {
					handle,
					bio,
					createdAt,
					imageUrl,
					website,
					location,
				},
				loading,
				authenticated,
			},
		} = this.props

		let markUp = !loading ? (
			authenticated ? (
				<Paper className={classes.paper}>
					<div className={classes.profile}>
						<div className="image-wrapper">
							<img
								src={imageUrl}
								className="profile-image"
								alt="profile"
							/>
							<hr />

							<div className="profile-details">
								<MuiLink
									component={Link}
									to={`/users/${handle}`}
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
										<LocationOn color="primary" />{" "}
										<span>{location}</span>
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
								<span>
									Joined {dayjs(createdAt).format("MMM YYYY")}
								</span>
							</div>
						</div>
					</div>
				</Paper>
			) : (
				<Paper className={classes.paper}>
					<Typography variant="body2">
						No profile found, please login
					</Typography>
					<div className={classes.buttons}>
						<Button
							variant="contained"
							color="primary"
							component={Link}
							to="/login"
						>
							Login
						</Button>
						<Button
							variant="contained"
							color="secondary"
							component={Link}
							to="/signup"
						>
							Signup
						</Button>
					</div>
				</Paper>
			)
		) : (
			<p>Loading...</p>
		)

		return <div>{markUp}</div>
	}
}

const mapStateToProps = state => ({
	user: state.user,
})

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))
