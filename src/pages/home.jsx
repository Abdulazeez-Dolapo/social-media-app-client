import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"

import { getAllTweets } from "../services/tweet"

import Tweet from "../components/Tweet"

class home extends Component {
	state = {
		tweets: null,
	}

	componentDidMount() {
		getAllTweets()
			.then(({ data }) => {
				this.setState({
					tweets: data.tweets,
				})
			})
			.catch(error => {
				console.log(error.response)
			})
	}

	render() {
		const recentTweets = this.state.tweets ? (
			this.state.tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} />)
		) : (
			<p>Loading Tweets...</p>
		)
		return (
			<Grid container spacing={10}>
				<Grid item xs={12} sm={8}>
					{recentTweets}
				</Grid>

				<Grid item xs={12} sm={4}>
					<p>Profile</p>
				</Grid>
			</Grid>
		)
	}
}

export default home
