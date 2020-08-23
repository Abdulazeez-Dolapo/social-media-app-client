import {
	SET_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	lOADING_USER,
	STOP_lOADING_USER,
} from "../types"

const initialState = {
	authenticated: false,
	credentials: [],
	likes: [],
	loading: false,
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
				loading: false,
			}

		case lOADING_USER:
			return {
				...state,
				loading: true,
			}

		default:
			return {
				...state,
			}
	}
}
