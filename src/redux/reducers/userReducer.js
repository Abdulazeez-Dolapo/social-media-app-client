import {
	SET_USER,
	SET_USER_NOTIFICATIONS,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	STOP_LOADING_USER,
	LIKE_TWEET,
	UNLIKE_TWEET,
	MARK_NOTIFICATIONS_AS_READ,
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

		case SET_USER_NOTIFICATIONS:
			const uniqueNotifications = []
			const notificationIds = state.notifications.map(
				notification => notification.id
			)

			action.payload.forEach(notification => {
				if (!notificationIds.includes(notification.id)) {
					uniqueNotifications.push(notification)
				}
			})

			return {
				...state,
				notifications: [...uniqueNotifications, ...state.notifications],
			}

		case LOADING_USER:
			return {
				...state,
				loading: true,
			}

		case STOP_LOADING_USER:
			return {
				...state,
				loading: false,
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

		case MARK_NOTIFICATIONS_AS_READ:
			return {
				...state,
				notifications: state.notifications.map(notification => {
					notification.read = true
					return notification
				}),
			}

		default:
			return {
				...state,
			}
	}
}
