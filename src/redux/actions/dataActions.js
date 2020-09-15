import {
	SET_TWEETS,
	LOADING_DATA,
	LIKE_TWEET,
	UNLIKE_TWEET,
	DELETE_TWEET,
} from "../types"
// import
import {
	getAllTweets,
	likeSingleTweet,
	unlikeSingleTweet,
	deleteSingleTweet,
} from "../../services/tweet"

export const getTweets = () => async dispatch => {
	try {
		dispatch({ type: LOADING_DATA })
		const { data } = await getAllTweets()
		console.log(data)

		dispatch({ type: SET_TWEETS, payload: data.tweets })
	} catch (error) {
		console.log(error.response.data.error)
		dispatch({
			type: SET_TWEETS,
			payload: [],
		})
	}
}

export const likeTweet = tweetId => async dispatch => {
	try {
		const { data } = await likeSingleTweet(tweetId)
		console.log(data)
		dispatch({ type: LIKE_TWEET, payload: data.tweet })
	} catch (error) {
		console.log(error.response.data.error)
	}
}

export const unlikeTweet = tweetId => async dispatch => {
	try {
		const { data } = await unlikeSingleTweet(tweetId)
		console.log(data)
		dispatch({ type: UNLIKE_TWEET, payload: data.tweet })
	} catch (error) {
		console.log(error.response.data.error)
	}
}

export const deleteTweet = tweetId => async dispatch => {
	try {
		const { data } = await deleteSingleTweet(tweetId)
		console.log(data)
		dispatch({ type: DELETE_TWEET, payload: tweetId })
	} catch (error) {
		console.log(error.response)
	}
}
