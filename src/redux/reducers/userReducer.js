import {
	SET_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	lOADING_USER,
	LIKE_TWEET,
	UNLIKE_TWEET,
} from "../types"

const initialState = {
	authenticated: false,
	credentials: [],
	likes: [],
	loading: false,
	notifications: [],
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			}

		case SET_UNAUTHENTICATED:
			return initialState

		case SET_USER:
			return {
				...action.payload,
				authenticated: true,
				loading: false,
			}

		case lOADING_USER:
			return {
				...state,
				loading: true,
			}

		case LIKE_TWEET:
			return {
				...state,
				likes: [
					...state.likes,
					{
						userHandle: state.credentials.handle,
						tweetId: action.payload.id,
					},
				],
			}

		case UNLIKE_TWEET:
			return {
				...state,
				likes: state.likes.filter(
					like => like.tweetId !== action.payload.id
				),
			}

		default:
			return {
				...state,
			}
	}
}
