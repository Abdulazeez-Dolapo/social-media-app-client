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
	lOADING_USER,
	STOP_lOADING_USER,
} from "../types"
import {
	userLogin,
	getUserData,
	signUp,
	uploadImage,
	editUserData,
} from "../../services/auth"

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
			payload: error.response.data.error,
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
			payload: error.response.data.error,
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
		dispatch({ type: lOADING_USER })
		const { data } = await getUserData()

		dispatch({
			type: SET_USER,
			payload: data.userData,
		})
	} catch (error) {
		console.log(error.response)
	}
}

export const uploadUserImage = formData => async dispatch => {
	try {
		dispatch({ type: lOADING_USER })
		const { data } = await uploadImage(formData)
		console.log(data)
		dispatch(setUserData())
	} catch (error) {
		console.log(error.response)
	}
}

export const editUserDetails = userDetails => async dispatch => {
	try {
		dispatch({ type: lOADING_USER })
		const { data } = await editUserData(userDetails)
		console.log(data)
		dispatch(setUserData())
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: SET_ERRORS,
			payload: error.response.data.error,
		})
	}
}
