import { SET_TWEETS, LOADING_DATA } from "../types"

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

		default:
			return { ...state }
	}
}
