import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"

// My created components
import MyIconButton from "../Utilities/MyIconButton"

// Material UI components
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"

// Material UI icons
import DeleteOutline from "@material-ui/icons/DeleteOutline"

// Redux
import { connect } from "react-redux"
import { deleteTweet } from "../../redux/actions/dataActions"

const styles = {
	deleteButton: {
		position: "absolute",
		bottom: "0%",
		left: "90%",
	},
}

class DeleteTweet extends Component {
	state = {
		open: false,
	}

	handleOpen = () => {
		this.setState({ open: true })
	}

	handleClose = () => {
		this.setState({ open: false })
	}

	handleTweetDelete = () => {
		const { deleteTweet, tweetId } = this.props
		deleteTweet(tweetId)
		this.handleClose()
	}

	render() {
		const { classes } = this.props

		return (
			<Fragment>
				<MyIconButton
					toolTipTitle="Delete Tweet"
					onClick={this.handleOpen}
					buttonClass={classes.deleteButton}
				>
					<DeleteOutline color="secondary" />
				</MyIconButton>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="delete-tweet-dialog"
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>
						Are you sure you want to delete this tweet ?
					</DialogTitle>

					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>

						<Button onClick={this.handleTweetDelete} color="secondary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		)
	}
}

DeleteTweet.propTypes = {
	deleteTweet: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	tweetId: PropTypes.string.isRequired,
}

const mapActionToProps = { deleteTweet }

export default connect(null, mapActionToProps)(withStyles(styles)(DeleteTweet))
