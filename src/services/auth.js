import { axiosInstance } from "./axios"

export const logIn = userData => {
	return axiosInstance.post("/login", userData)
}

export const signUp = userData => {
	return axiosInstance.post("/signup", userData)
}
