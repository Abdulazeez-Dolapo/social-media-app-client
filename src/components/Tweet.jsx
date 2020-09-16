import React, { Component, Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

// Third party Libraries
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

// Material UI components
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

// Icons
import ChatIcon from "@material-ui/icons/Chat"

// My created components
import MyIconButton from "./Utilities/MyIconButton"
import DeleteTweet from "./DeleteTweet"
import TweetDialog from "./TweetDialog"
import LikeButton from "./LikeButton"

// Redux
import { connect } from "react-redux"

const styles = {
	card: {
		position: "relative",
		display: "flex",
		marginBottom: 20,
	},
	image: {
		minWidth: 200,
	},
	content: {
		padding: 25,
		objectFit: "cover",
	},
}

export class Tweet extends Component {
	render() {
		dayjs.extend(relativeTime)

		const {
			classes,
			tweet: {
				body,
				userHandle,
				userImage,
				createdAt,
				id,
				likesCount,
				commentsCount,
			},
			user: {
				authenticated,
				credentials: { handle },
			},
		} = this.props

		const deleteButton =
			authenticated && userHandle === handle ? (
				<DeleteTweet tweetId={id} />
			) : null

		return (
			<Card className={classes.card}>
				<CardMedia
					image={userImage}
					title="Profile picture"
					className={classes.image}
				/>
				<CardContent className={classes.content}>
					<Typography
						variant="h5"
						component={Link}
						to={`/users/${userHandle}`}
						color="primary"
					>
						{userHandle}
					</Typography>

					{deleteButton}
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).fromNow()}
					</Typography>

					<Typography variant="body1">{body}</Typography>

					<LikeButton tweetId={id} />

					<span>{likesCount} likes</span>

					<MyIconButton toolTipTitle="comment">
						<ChatIcon color="primary" />
					</MyIconButton>
					<span>{commentsCount} comments</span>
				</CardContent>

				<TweetDialog tweetId={id} userHandle={userHandle} />
			</Card>
		)
	}
}

Tweet.propTypes = {
	user: PropTypes.object.isRequired,
	tweet: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	user: state.user,
})

export default connect(mapStateToProps)(withStyles(styles)(Tweet))
