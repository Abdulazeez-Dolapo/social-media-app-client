import {
	setAuthorizationHeaders,
	removeAuthorizationHeaders,
} from "../../services/axios"

import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	STOP_LOADING_USER,
	MARK_NOTIFICATIONS_AS_READ,
	UPDATE_USER_IMAGE_IN_TWEETS,
} from "../types"
import {
	userLogin,
	getUserData,
	signUp,
	uploadImage,
	editUserData,
} from "../../services/auth"

import { markAsRead } from "../../services/notifications"

export const loginUser = (userData, history) => async dispatch => {
	try {
		dispatch({ type: LOADING_UI })
		const { data } = await userLogin(userData)

		const token = `Bearer ${data.token}`
		localStorage.setItem("FBToken", token)
		setAuthorizationHeaders(token)

		dispatch(setUserData())
		dispatch({ type: CLEAR_ERRORS })
		history.replace("/")
	} catch (error) {
		console.log(error)
		dispatch({
			type: SET_ERRORS,
			payload: error?.response?.data?.error,
		})
	}
}

export const userSignup = (newUserData, history) => async dispatch => {
	try {
		dispatch({ type: LOADING_UI })
		await signUp(newUserData)
		const loginCredentials = {
			email: newUserData.email,
			password: newUserData.password,
		}
		dispatch(loginUser(loginCredentials, history))
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: SET_ERRORS,
			payload: error?.response?.data?.error,
		})
	}
}

export const logoutUser = () => dispatch => {
	localStorage.removeItem("FBToken")
	removeAuthorizationHeaders()
	dispatch({ type: SET_UNAUTHENTICATED })
}

export const setUserData = () => async dispatch => {
	try {
		dispatch({ type: LOADING_USER })
		const { data } = await getUserData()

		dispatch({
			type: SET_USER,
			payload: data.userData,
		})
	} catch (error) {
		console.log(error)
		console.log(error.response)
	}
}

export const uploadUserImage = formData => async dispatch => {
	try {
		dispatch({ type: LOADING_USER })
		const { data } = await uploadImage(formData)
		console.log(data)
		dispatch(setUserData())
		const payload = { imageUrl: data.imageUrl, userHandle: data.userHandle }
		dispatch({ type: UPDATE_USER_IMAGE_IN_TWEETS, payload })
	} catch (error) {
		dispatch({ type: STOP_LOADING_USER })
		console.log(error.response)
	}
}

export const editUserDetails = userDetails => async dispatch => {
	try {
		dispatch({ type: LOADING_USER })
		const { data } = await editUserData(userDetails)
		console.log(data)
		dispatch(setUserData())
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: SET_ERRORS,
			payload: error?.response?.data?.error,
		})
	}
}

export const markNotificationsAsRead = notificationIds => async dispatch => {
	try {
		const { data } = await markAsRead(notificationIds)
		console.log(data)
		dispatch({ type: MARK_NOTIFICATIONS_AS_READ })
	} catch (error) {
		console.log(error.response)
	}
}
