import { axiosInstance } from "./axios"

export const logIn = userData => {
	return axiosInstance.post("/login", userData)
}
