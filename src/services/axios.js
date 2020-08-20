import axios from "axios"

export const axiosInstance = axios.create({
	baseURL: "http://localhost:5001/social-media-reac/europe-west1/api",
	timeout: 10000,
})

export const setAxiosHeaders = token => {
	axiosInstance.defaults.headers.common["Authorization"] = token
}
