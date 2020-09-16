import axios from "axios"

export const axiosInstance = axios.create({
	baseURL: "http://localhost:5001/social-media-reac/europe-west1/api",
	timeout: 25000,
})

export const setAuthorizationHeaders = token => {
	axiosInstance.defaults.headers.common["Authorization"] = token
}
export const removeAuthorizationHeaders = token => {
	delete axiosInstance.defaults.headers.common["Authorization"]
}
