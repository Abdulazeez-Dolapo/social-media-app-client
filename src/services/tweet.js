import { axiosInstance } from "./axios"

export const getAllTweets = () => {
	return axiosInstance.get("/tweets")
}
