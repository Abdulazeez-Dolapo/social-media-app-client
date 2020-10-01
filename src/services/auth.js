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

export const getUserDetails = userHandle => {
	return axiosInstance.get(`/user/${userHandle}`)
}

export const uploadImage = formData => {
	return axiosInstance.post("/user/upload-image", formData)
}

export const editUserData = userData => {
	return axiosInstance.post("/user/update-details", userData)
}
