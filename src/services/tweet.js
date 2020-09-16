import { axiosInstance } from "./axios"

export const getAllTweets = () => {
	return axiosInstance.get("/tweets")
}

export const getSingleTweet = tweetId => {
	return axiosInstance.get(`/tweet/${tweetId}`)
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

export const postSingleTweet = tweetData => {
	return axiosInstance.post(`/create-tweet`, tweetData)
}
