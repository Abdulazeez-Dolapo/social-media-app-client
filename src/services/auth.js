import { axiosInstance } from "./axios"

export const userLogin = userData => {
	return axiosInstance.post("/login", userData)
}

export const signUp = userData => {
	return axiosInstance.post("/signup", userData)
}

export const getUserData = () => {
	return axiosInstance.get("/user/get-details")
}
