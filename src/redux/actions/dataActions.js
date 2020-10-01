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
	POST_COMMENT,
} from "../types"

import {
	getAllTweets,
	likeATweet,
	unlikeATweet,
	deleteATweet,
	postATweet,
	getATweet,
	postAComment,
} from "../../services/tweet"

import { getUserDetails } from "../../services/auth"

export const getTweets = () => async dispatch => {
	try {
		dispatch({ type: LOADING_DATA })
		const { data } = await getAllTweets()

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
		const { data } = await getATweet(tweetId)
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
		const { data } = await likeATweet(tweetId)
		console.log(data)
		dispatch({ type: LIKE_TWEET, payload: data.tweet })
	} catch (error) {
		console.log(error)
	}
}

export const unlikeTweet = tweetId => async dispatch => {
	try {
		const { data } = await unlikeATweet(tweetId)
		console.log(data)
		dispatch({ type: UNLIKE_TWEET, payload: data.tweet })
	} catch (error) {
		console.log(error)
	}
}

export const deleteTweet = tweetId => async dispatch => {
	try {
		const { data } = await deleteATweet(tweetId)
		console.log(data)
		dispatch({ type: DELETE_TWEET, payload: tweetId })
	} catch (error) {
		console.log(error.response)
	}
}

export const postTweet = newTweetData => async dispatch => {
	try {
		dispatch({ type: LOADING_UI })
		const { data } = await postATweet(newTweetData)
		console.log(data)

		dispatch({ type: POST_TWEET, payload: data.tweet })
		dispatch(clearErrors())
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: SET_ERRORS,
			payload: error?.response?.data?.error,
		})
	}
}

export const postComment = (tweetId, commentData) => async dispatch => {
	try {
		// dispatch({ type: LOADING_UI })
		const { data } = await postAComment(tweetId, commentData)
		console.log(data)

		dispatch({ type: POST_COMMENT, payload: data })
		dispatch(clearErrors())
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: SET_ERRORS,
			payload: error?.response?.data?.error,
		})
	}
}

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS })
}

export const setUserDetails = userHandle => async dispatch => {
	try {
		dispatch({ type: LOADING_DATA })
		const { data } = await getUserDetails(userHandle)
		console.log(data)

		dispatch({
			type: SET_TWEETS,
			payload: data.userData.tweets,
		})
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: SET_TWEETS,
			payload: [],
		})
	}
}
