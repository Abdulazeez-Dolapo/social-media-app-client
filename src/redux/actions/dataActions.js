import {
	SET_TWEETS,
	SET_TWEET,
	CLEAR_TWEET,
	LOADING_DATA,
	LOADING_UI,
	LIKE_TWEET,
	UNLIKE_TWEET,
	DELETE_TWEET,
	POST_TWEET,
	SET_ERRORS,
	CLEAR_ERRORS,
	STOP_LOADING_UI,
} from "../types"

import {
	getAllTweets,
	likeSingleTweet,
	unlikeSingleTweet,
	deleteSingleTweet,
	postSingleTweet,
	getSingleTweet,
} from "../../services/tweet"

export const getTweets = () => async dispatch => {
	try {
		dispatch({ type: LOADING_DATA })
		const { data } = await getAllTweets()
		console.log(data)

		dispatch({ type: SET_TWEETS, payload: data.tweets })
	} catch (error) {
		console.log(error)
		dispatch({
			type: SET_TWEETS,
			payload: [],
		})
	}
}

export const getTweet = tweetId => async dispatch => {
	try {
		dispatch({ type: LOADING_UI })
		const { data } = await getSingleTweet(tweetId)
		console.log(data)

		dispatch({ type: SET_TWEET, payload: data.tweetData })
		dispatch({ type: STOP_LOADING_UI })
	} catch (error) {
		console.log(error)
		dispatch({
			type: SET_TWEET,
			payload: [],
		})
	}
}

export const clearTweet = () => dispatch => {
	dispatch({ type: CLEAR_TWEET })
}

export const likeTweet = tweetId => async dispatch => {
	try {
		const { data } = await likeSingleTweet(tweetId)
		console.log(data)
		dispatch({ type: LIKE_TWEET, payload: data.tweet })
	} catch (error) {
		console.log(error)
	}
}

export const unlikeTweet = tweetId => async dispatch => {
	try {
		const { data } = await unlikeSingleTweet(tweetId)
		console.log(data)
		dispatch({ type: UNLIKE_TWEET, payload: data.tweet })
	} catch (error) {
		console.log(error)
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

export const postTweet = newTweetData => async dispatch => {
	try {
		dispatch({ type: LOADING_UI })
		const { data } = await postSingleTweet(newTweetData)
		console.log(data)

		dispatch({ type: POST_TWEET, payload: data.tweet })
		dispatch({ type: CLEAR_ERRORS })
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: SET_ERRORS,
			payload: error.response.data.error,
		})
	}
}

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS })
}
