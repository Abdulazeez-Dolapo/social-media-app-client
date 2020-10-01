import React, { Component } from "react"
import PropTypes from "prop-types"

// My created components
import Tweet from "../components/Tweet/Tweet"
import StaticProfile from "../components/Profile/StaticProfile"

// Material UI
import Grid from "@material-ui/core/Grid"

// Services
import { getUserDetails } from "../services/auth"

// Redux
import { connect } from "react-redux"
import { setUserDetails } from "../redux/actions/dataActions"

export class user extends Component {
	state = {
		profile: null,
		tweetId: null,
	}

	async componentDidMount() {
		try {
			const { handle: userHandle, tweetId } = this.props.match.params

			if (tweetId) this.setState({ tweetId })

			this.props.setUserDetails(userHandle)
			const { data } = await getUserDetails(userHandle)

			this.setState({
				profile: data.userData.user,
			})
		} catch (error) {
			console.log(error.response)
		}
	}

	render() {
		const { loading, tweets } = this.props.data
		const { tweetId } = this.state

		const tweetsMarkup = loading ? (
			<p>Loading Tweets...</p>
		) : !tweetId ? (
			tweets.length > 0 ? (
				tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} />)
			) : (
				<p>There are no available tweets for this user</p>
			)
		) : (
			tweets.map(tweet => {
				if (tweet.id !== tweetId) {
					return <Tweet key={tweet.id} tweet={tweet} />
				} else {
					return <Tweet key={tweet.id} tweet={tweet} openDialog />
				}
			})
		)

		return (
			<Grid container spacing={2}>
				<Grid item xs={12} sm={8}>
					{tweetsMarkup}
				</Grid>

				<Grid item xs={12} sm={4}>
					{this.state.profile == null ? (
						<p>Loading Profile...</p>
					) : (
						<StaticProfile profile={this.state.profile} />
					)}
				</Grid>
			</Grid>
		)
	}
}

user.propTypes = {
	data: PropTypes.object.isRequired,
	setUserDetails: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	data: state.data,
})

const mapActionToProps = {
	setUserDetails,
}

export default connect(mapStateToProps, mapActionToProps)(user)
