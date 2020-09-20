import React, { Component } from "react"
import PropTypes from "prop-types"

// Material UI
import Grid from "@material-ui/core/Grid"

// My components
import Tweet from "../components/Tweet/Tweet"
import Profile from "../components/Profile/Profile"

// Redux
import { connect } from "react-redux"
import { getTweets } from "../redux/actions/dataActions"

class home extends Component {
	componentDidMount() {
		this.props.getTweets()
	}

	render() {
		const { loading, tweets } = this.props

		const recentTweets = loading ? (
			<p>Loading Tweets...</p>
		) : (
			tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} />)
		)
		return (
			<Grid container spacing={2}>
				<Grid item xs={12} sm={8}>
					{recentTweets}
				</Grid>

				<Grid item xs={12} sm={4}>
					<Profile />
				</Grid>
			</Grid>
		)
	}
}

const mapStateToProps = state => ({
	tweets: state.data.tweets,
	loading: state.data.loading,
})

const mapActionsToProps = {
	getTweets,
}

home.propTypes = {
	tweets: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(home)
