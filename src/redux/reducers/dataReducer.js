import { SET_TWEETS, LOADING_DATA, LIKE_TWEET, UNLIKE_TWEET } from "../types"

const initialState = {
	tweets: [],
	tweet: {},
	loading: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_TWEETS:
			return {
				...state,
				tweets: action.payload,
				loading: false,
			}

		case LOADING_DATA:
			return {
				...state,
				loading: true,
			}

		case LIKE_TWEET:
		case UNLIKE_TWEET:
			const index = state.tweets.findIndex(
				tweet => tweet.id == action.payload.id
			)
			state.tweets[index] = action.payload
			return {
				...state,
			}

		default:
			return { ...state }
	}
}
