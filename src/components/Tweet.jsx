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
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"
import Favorite from "@material-ui/icons/Favorite"

// My created components
import MyIconButton from "./Utilities/MyIconButton"

// Redux
import { connect } from "react-redux"
import { likeTweet, unlikeTweet } from "../redux/actions/dataActions"

const styles = {
	card: {
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
	isTweetLiked = () => {
		return this.props.user.likes?.find(
			like => like.tweetId == this.props.tweet.id
		)
	}

	likeTweet = () => {
		this.props.likeTweet(this.props.tweet.id)
	}

	unlikeTweet = () => {
		this.props.unlikeTweet(this.props.tweet.id)
	}

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
			user: { authenticated },
		} = this.props

		let likeButton
		if (!authenticated) {
			likeButton = (
				<MyIconButton toolTipTitle="like">
					<Link to="/login">
						<FavoriteBorder color="primary" />
					</Link>
				</MyIconButton>
			)
		} else {
			if (this.isTweetLiked()) {
				likeButton = (
					<MyIconButton onClick={this.unlikeTweet} toolTipTitle="unlike">
						<Favorite color="primary" />
					</MyIconButton>
				)
			} else {
				likeButton = (
					<MyIconButton onClick={this.likeTweet} toolTipTitle="like">
						<FavoriteBorder color="primary" />
					</MyIconButton>
				)
			}
		}

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
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).fromNow()}
					</Typography>
					<Typography variant="body1">{body}</Typography>
					{likeButton}
					<span>{likesCount} likes</span>
					<MyIconButton toolTipTitle="comment">
						<ChatIcon color="primary" />
					</MyIconButton>
					<span>{commentsCount} comments</span>
				</CardContent>
			</Card>
		)
	}
}

Tweet.propTypes = {
	likeTweet: PropTypes.func.isRequired,
	unlikeTweet: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	tweet: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	user: state.user,
})

const mapActionToProps = { likeTweet, unlikeTweet }

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(Tweet))
