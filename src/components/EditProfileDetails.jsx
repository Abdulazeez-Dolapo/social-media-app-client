import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"

// Material UI components
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

// Redux
import { connect } from "react-redux"
import { editUserDetails } from "../redux/actions/userActions"

const styles = theme => ({
	...theme.customStyles,
})

class EditProfileDetails extends Component {
	constructor() {
		super()

		this.state = {
			openDialog: false,
			bio: "",
			location: "",
			website: "",
		}
	}

	componentDidMount() {
		const {
			user: {
				credentials: { bio, website, location },
			},
		} = this.props

		this.setState({
			bio: bio || "",
			website: website || "",
			location: location || "",
		})
	}

	handleClickOpen = () => {
		this.setState({
			openDialog: true,
		})
	}

	handleClickClose = () => {
		this.setState({
			openDialog: false,
		})
	}

	handleSubmit = () => {
		const userData = {
			bio: this.state.bio,
			website: this.state.website,
			location: this.state.location,
		}

		this.props.editUserDetails(userData)
	}

	handleInput = event => {
		const { name, value } = event.target
		this.setState(state => ({
			...state,
			[name]: value,
		}))
	}

	render() {
		const { classes } = this.props

		return (
			<Fragment>
				<Button
					variant="outlined"
					color="primary"
					onClick={this.handleClickOpen}
				>
					Edit Profile Details
				</Button>
				<Dialog
					open={this.state.openDialog}
					onClose={this.handleClickClose}
					aria-labelledby="form-dialog-title"
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle id="form-dialog-title">
						Edit Your Profile Details
					</DialogTitle>
					<DialogContent>
						<DialogContentText>Edit Profile details</DialogContentText>
						<form>
							<TextField
								autoFocus
								margin="dense"
								name="bio"
								label="Bio"
								onChange={this.handleInput}
								value={this.state.bio}
								type="text"
								fullWidth
								multiline
								rows="3"
								placeholder="A short Bio about yourself"
								className={classes.textField}
							/>

							<TextField
								autoFocus
								margin="dense"
								name="location"
								label="Location"
								value={this.state.location}
								onChange={this.handleInput}
								type="text"
								fullWidth
								placeholder="Location e.g Abuja, Nigeria"
								className={classes.textField}
							/>

							<TextField
								autoFocus
								margin="dense"
								name="website"
								value={this.state.website}
								onChange={this.handleInput}
								label="Website"
								type="text"
								fullWidth
								placeholder="Your website e.g https://www.google.com"
								className={classes.textField}
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClickClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user,
})
const mapActionToProps = { editUserDetails }

EditProfileDetails.propTypes = {
	classes: PropTypes.object.isRequired,
	editUserDetails: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(EditProfileDetails))
