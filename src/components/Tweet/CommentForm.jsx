import React, { Component } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"

// Material UI Components
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

// Redux
import { connect } from "react-redux"
import { postComment } from "../../redux/actions/dataActions"

const styles = theme => ({
	...theme.customStyles,
})

export class CommentForm extends Component {
	state = {
		body: "",
		errors: {},
	}

	static getDerivedStateFromProps(nextProps, previousState) {
		if (nextProps.UI.errors !== previousState.errors) {
			return { ...previousState, errors: nextProps.UI.errors }
		} else return null
	}

	clearState = () => {
		this.setState({
			errors: {},
			body: "",
		})
	}

	handleInput = event => {
		const { name, value } = event.target
		this.setState({
			[name]: value,
		})
	}

	handleSubmit = async event => {
		try {
			event.preventDefault()

			const newCommentData = {
				body: this.state.body,
			}
			await this.props.postComment(this.props.tweetId, newCommentData)

			if (Object.keys(this.state.errors).length < 1) {
				this.clearState()
			}
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const { classes, authenticated } = this.props
		const { body, errors } = this.state

		const commentFormMarkup = authenticated ? (
			<Grid item sm={12} style={{ textAlign: "center" }}>
				<form onSubmit={this.handleSubmit}>
					<TextField
						name="body"
						type="text"
						label="Comment on tweet"
						error={errors.comment ? true : false}
						helperText={errors.comment}
						value={body}
						onChange={this.handleInput}
						fullWidth
						className={classes.textField}
					></TextField>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={classes.button}
					>
						Submit
					</Button>
				</form>

				<hr className={classes.invisibleSeparator} />
			</Grid>
		) : null

		return commentFormMarkup
	}
}

CommentForm.propTypes = {
	tweetId: PropTypes.string.isRequired,
	postComment: PropTypes.func.isRequired,
	authenticated: PropTypes.bool.isRequired,
	UI: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	UI: state.UI,
	authenticated: state.user.authenticated,
})

const mapActionToProps = { postComment }

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(CommentForm))
