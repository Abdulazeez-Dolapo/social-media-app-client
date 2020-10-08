import { axiosInstance } from "./axios"

export const markAsRead = notificationIds => {
	return axiosInstance.post(`/notifications/mark-as-read`, notificationIds)
}

export const getNotifications = () => {
	return axiosInstance.get(`/notifications`)
}
