import { axiosInstance } from "./axios"

export const getAllTweets = () => {
	return axiosInstance.get("/tweets")
}

export const likeSingleTweet = tweetId => {
	return axiosInstance.post(`/tweet/${tweetId}/like`)
}

export const unlikeSingleTweet = tweetId => {
	return axiosInstance.post(`/tweet/${tweetId}/unlike`)
}

export const deleteSingleTweet = tweetId => {
	return axiosInstance.delete(`/tweet/${tweetId}`)
}
