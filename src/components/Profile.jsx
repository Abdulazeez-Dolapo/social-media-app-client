import React, { Component, Fragment, createRef } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import EditProfileDetails from "./EditProfileDetails"

// Material UI components
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import MuiLink from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"

// Icons
import LocationOn from "@material-ui/icons/LocationOn"
import CalendarToday from "@material-ui/icons/CalendarToday"
import LinkIcon from "@material-ui/icons/Link"
import EditIcon from "@material-ui/icons/Edit"
import KeyboardReturn from "@material-ui/icons/KeyboardReturn"

// Redux
import { connect } from "react-redux"
import { uploadUserImage, logoutUser } from "../redux/actions/userActions"

const styles = theme => ({
	...theme.customStyles,
})

class Profile extends Component {
	constructor(props) {
		super(props)
		this.fileInput = createRef()
	}

	handleImageUpload = event => {
		const image = event.target.files[0]
		const formData = new FormData()
		formData.append("image", image, image.name)
		this.props.uploadUserImage(formData)
	}

	handleImageSelection = () => {
		this.fileInput.current.click()
	}

	handleLogout = () => {
		this.props.logoutUser()
	}

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

							<input
								type="file"
								ref={this.fileInput}
								id="profile-image"
								hidden="hidden"
								onChange={this.handleImageUpload}
							/>

							<Tooltip title="Edit profile image" placement="top">
								<IconButton
									onClick={this.handleImageSelection}
									className="button"
								>
									<EditIcon color="primary" />
								</IconButton>
							</Tooltip>
							<hr />
						</div>

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
							<span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
						</div>

						<Tooltip title="Logout" placement="top">
							<IconButton onClick={this.handleLogout} className="button">
								<KeyboardReturn color="primary" />
							</IconButton>
						</Tooltip>

						<EditProfileDetails />
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

const mapActionsToProps = {
	uploadUserImage,
	logoutUser,
}

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	uploadUserImage: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Profile))
