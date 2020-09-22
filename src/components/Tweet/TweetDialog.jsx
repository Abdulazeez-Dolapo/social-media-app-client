import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import dayjs from "dayjs"
import { Link } from "react-router-dom"

// My Created Components
import MyIconButton from "../Utilities/MyIconButton"
import LikeButton from "./LikeButton"
import Comments from "./Comments"
import CommentForm from "./CommentForm"

// Material UI components
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

// Icons
import UnfoldMore from "@material-ui/icons/UnfoldMore"
import CloseIcon from "@material-ui/icons/Close"
import ChatIcon from "@material-ui/icons/Chat"

// Redux
import { connect } from "react-redux"
import {
	getTweet,
	clearTweet,
	clearErrors,
} from "../../redux/actions/dataActions"

const styles = theme => ({
	...theme.customStyles,
	profileImage: {
		maxWidth: 200,
		height: 200,
		borderRadius: "50%",
		objectFit: "cover",
	},
	dialogContent: {
		padding: 20,
	},
	closeButton: {
		position: "absolute",
		left: "90%",
	},
	expandButton: {
		position: "absolute",
		left: "90%",
		top: "8%",
	},
	spinnerContainer: {
		textAlign: "center",
		marginTop: 50,
		marginBottom: 50,
	},
})

class TweetDialog extends Component {
	state = {
		openDialog: false,
	}

	handleClickOpen = () => {
		this.props.getTweet(this.props.tweetId)
		this.setState({
			openDialog: true,
		})
	}

	handleClickClose = () => {
		this.props.clearErrors()
		this.props.clearTweet()
		this.setState({
			openDialog: false,
		})
	}

	render() {
		const {
			classes,
			tweet: {
				id,
				body,
				createdAt,
				likesCount,
				commentsCount,
				userImage,
				userHandle,
				comments,
			},
			UI: { loading },
		} = this.props

		const dialogMarkup = loading ? (
			<div className={classes.spinnerContainer}>
				<CircularProgress size={200} thickness={2} />
			</div>
		) : (
			<Grid container spacing={2}>
				<Grid item sm={5}>
					<img
						src={userImage}
						alt="profile"
						className={classes.profileImage}
					/>
				</Grid>

				<Grid item sm={7}>
					<Typography
						component={Link}
						color="primary"
						variant="h5"
						to={`/users/${userHandle}`}
					>
						@{userHandle}
					</Typography>

					<hr className={classes.invisibleSeparator} />

					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
					</Typography>

					<hr className={classes.invisibleSeparator} />

					<Typography variant="body1">{body}</Typography>

					<LikeButton tweetId={id} likesCount={likesCount}></LikeButton>
					<MyIconButton toolTipTitle="comment">
						<ChatIcon color="primary" />
					</MyIconButton>
					<span>{commentsCount} comments</span>
				</Grid>

				<hr className={classes.visibleSeparator} />

				<CommentForm tweetId={id} />

				<Comments comments={comments} />
			</Grid>
		)

		return (
			<Fragment>
				<MyIconButton
					onClick={this.handleClickOpen}
					toolTipTitle="View more details"
					toolTipClass={classes.expandButton}
				>
					<UnfoldMore color="primary" />
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

					<DialogContent className={classes.dialogContent}>
						{dialogMarkup}
					</DialogContent>
				</Dialog>
			</Fragment>
		)
	}
}

TweetDialog.propTypes = {
	getTweet: PropTypes.func.isRequired,
	clearTweet: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	tweetId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	tweet: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	UI: state.UI,
	tweet: state.data.tweet,
})

const mapActionToProps = { getTweet, clearTweet, clearErrors }

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(TweetDialog))
