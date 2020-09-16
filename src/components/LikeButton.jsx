import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import MyIconButton from "./Utilities/MyIconButton"

import FavoriteBorder from "@material-ui/icons/FavoriteBorder"
import Favorite from "@material-ui/icons/Favorite"

import { connect } from "react-redux"
import { likeTweet, unlikeTweet } from "../redux/actions/dataActions"

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
		const { authenticated } = this.props

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

		return likeButton
	}
}

LikeButton.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	tweetId: PropTypes.string.isRequired,
	likeTweet: PropTypes.func.isRequired,
	unlikeTweet: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	authenticated: state.user.authenticated,
	user: state.user,
})

const mapActionsToProps = { likeTweet, unlikeTweet }

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
