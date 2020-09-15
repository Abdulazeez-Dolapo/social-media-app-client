import {
	SET_TWEETS,
	LOADING_DATA,
	LIKE_TWEET,
	UNLIKE_TWEET,
	DELETE_TWEET,
	POST_TWEET,
} from "../types"

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
			return {
				...state,
				tweets: state.tweets.map(tweet => {
					if (tweet.id == action.payload.id) {
						tweet = action.payload
					}
					return tweet
				}),
			}

		case DELETE_TWEET:
			return {
				...state,
				tweets: state.tweets.filter(tweet => tweet.id !== action.payload),
			}

		case POST_TWEET:
			return {
				...state,
				tweets: [action.payload, ...state.tweets],
			}

		default:
			return state
	}
}
