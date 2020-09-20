import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

// My created components
import MyIconButton from "../Utilities/MyIconButton"

// Icons
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"
import Favorite from "@material-ui/icons/Favorite"

// Redux
import { connect } from "react-redux"
import { likeTweet, unlikeTweet } from "../../redux/actions/dataActions"

export class LikeButton extends Component {
	isTweetLiked = () => {
		return this.props.user.likes?.find(
			like => like.tweetId == this.props.tweetId
		)
	}

	likeTweet = () => {
		this.props.likeTweet(this.props.tweetId)
	}

	unlikeTweet = () => {
		this.props.unlikeTweet(this.props.tweetId)
	}

	render() {
		const {
			user: { authenticated },
			likesCount,
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
			<Fragment>
				{likeButton} <span>{likesCount} likes</span>
			</Fragment>
		)
	}
}

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	tweetId: PropTypes.string.isRequired,
	likesCount: PropTypes.number.isRequired,
	likeTweet: PropTypes.func.isRequired,
	unlikeTweet: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	user: state.user,
})

const mapActionsToProps = { likeTweet, unlikeTweet }

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
