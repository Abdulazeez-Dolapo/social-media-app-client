import axios from "axios"
import { setAxiosHeaders } from "../../services/axios"

import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types"
import { userLogin, getUserData } from "../../services/auth"

export const loginUser = (userData, history) => async dispatch => {
	try {
		dispatch({ type: LOADING_UI })
		const { data } = await userLogin(userData)

		const token = `Bearer ${data.token}`
		localStorage.setItem("FBToken", token)
		setAxiosHeaders(token)

		dispatch(setUserData())
		dispatch({ type: CLEAR_ERRORS })
		history.replace("/")
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: SET_ERRORS,
			payload: error.response.data.error,
		})
	}
}

export const setUserData = () => async dispatch => {
	try {
		const { data } = await getUserData()

		dispatch({
			type: SET_USER,
			payload: data.userData,
		})
	} catch (error) {
		console.log(error.response)
	}
}
