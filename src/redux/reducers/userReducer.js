import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
} from "../types"

const initialState = {
	authenticated: false,
	credentials: [],
	likes: [],
	notifcations: [],
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
			}

		default:
			return {
				...state,
			}
	}
}
