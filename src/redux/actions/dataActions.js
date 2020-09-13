import { SET_TWEETS, LOADING_DATA, LIKE_TWEET, UNLIKE_TWEET } from "../types"
import { getAllTweets } from "../../services/tweet"

export const getTweets = () => async dispatch => {
	try {
		dispatch({ type: LOADING_DATA })
		const { data } = await getAllTweets()
		console.log(data)

		dispatch({
			type: SET_TWEETS,
			payload: data.tweets,
		})
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: SET_TWEETS,
			payload: [],
		})
	}
}
