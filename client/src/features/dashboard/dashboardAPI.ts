import { AxiosResponse } from "axios"
import { API } from "../../config/axiosInstance"

export function fetchUsers() {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.get(`/dashboard/fetch-users`)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

export function fetchStaff() {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.get(`/dashboard/fetch-staff`)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
