import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"

// My Created Components
import MyIconButton from "./Utilities/MyIconButton"

// Material UI components
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import CircularProgress from "@material-ui/core/CircularProgress"

// Icons
import AddIcon from "@material-ui/icons/Add"
import CloseIcon from "@material-ui/icons/Close"

// Redux
import { connect } from "react-redux"
import { postTweet, clearErrors } from "../redux/actions/dataActions"

const styles = theme => ({
	...theme.customStyles,
	submitButton: {
		position: "relative",
		float: "right",
		marginTop: "6px",
	},
	closeButton: {
		position: "absolute",
		left: "90%",
		top: "2%",
	},
	progressSpinner: {
		position: "absolute",
	},
})

class PostTweet extends Component {
	state = {
		openDialog: false,
		body: "",
		errors: {},
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.UI.errors !== prevState.errors) {
			return { ...prevState, errors: nextProps.UI.errors }
		} else return null
	}

	handleClickOpen = () => {
		this.setState({
			openDialog: true,
		})
	}

	clearState = () => {
		this.setState({
			errors: {},
			body: "",
		})
	}

	handleClickClose = () => {
		this.props.clearErrors()
		this.clearState()
		this.setState({
			openDialog: false,
		})
	}

	handleInput = event => {
		this.props.clearErrors()
		const { name, value } = event.target
		this.setState(state => ({
			...state,
			[name]: value,
		}))
	}

	handleSubmit = async event => {
		event.preventDefault()

		const newTweetData = {
			body: this.state.body,
		}

		await this.props.postTweet(newTweetData)

		if (!this.props.UI.loading && Object.keys(this.state.errors).length < 1) {
			this.handleClickClose()
		}
	}

	render() {
		const { errors } = this.state
		const {
			classes,
			UI: { loading },
		} = this.props

		return (
			<Fragment>
				<MyIconButton
					onClick={this.handleClickOpen}
					toolTipTitle="Post a tweet"
				>
					<AddIcon />
				</MyIconButton>

				<Dialog
					open={this.state.openDialog}
					onClose={this.handleClickClose}
					aria-labelledby="post-tweet-dialog"
					fullWidth
					maxWidth="sm"
				>
					<MyIconButton
						onClick={this.handleClickClose}
						toolTipTitle="Close"
						toolTipClass={classes.closeButton}
					>
						<CloseIcon />
					</MyIconButton>

					<DialogTitle id="form-dialog-title">
						Post a new tweet
					</DialogTitle>

					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								autoFocus
								margin="dense"
								name="body"
								label="Body"
								onChange={this.handleInput}
								value={this.state.body}
								type="text"
								fullWidth
								multiline
								rows="3"
								placeholder="Say hello to your friends"
								error={errors.body || errors.length ? true : false}
								helperText={errors.body || errors.length}
								className={classes.textField}
							/>

							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								Post
								{loading && (
									<CircularProgress
										size={30}
										className={classes.progressSpinner}
									/>
								)}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		)
	}
}

PostTweet.propTypes = {
	postTweet: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	UI: state.UI,
})

const mapActionToProps = { postTweet, clearErrors }

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(PostTweet))
