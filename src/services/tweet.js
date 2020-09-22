import { axiosInstance } from "./axios"

export const getAllTweets = () => {
	return axiosInstance.get("/tweets")
}

export const getATweet = tweetId => {
	return axiosInstance.get(`/tweet/${tweetId}`)
}

export const likeATweet = tweetId => {
	return axiosInstance.post(`/tweet/${tweetId}/like`)
}

export const unlikeATweet = tweetId => {
	return axiosInstance.post(`/tweet/${tweetId}/unlike`)
}

export const deleteATweet = tweetId => {
	return axiosInstance.delete(`/tweet/${tweetId}`)
}

export const postATweet = tweetData => {
	return axiosInstance.post(`/create-tweet`, tweetData)
}

export const postAComment = (tweetId, commentData) => {
	return axiosInstance.post(`/tweet/${tweetId}/comment`, commentData)
}
