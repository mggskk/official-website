import { AxiosResponse } from "axios"
import { API } from "../../config/axiosInstance"
import {
  UserType,
  LoginUserType,
  RegisterUserType,
  ChangeCurrPass,
} from "./authTypes"

export function registerUser(data: FormData) {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

export function loginUser(data: LoginUserType) {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/login`, data)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

export function fetchUser() {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.get(`/auth/fetch-user`)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

export function logOutUser() {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/log-out`)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

export function updateUser(userId: string, data: {}) {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.patch(`/auth/update-user/${userId}`, data)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

export function updateProfile(userId: string, data: {}) {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.patch(`/auth/update-profile/${userId}`, data)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

export function updateUserAvatar(data: FormData, userId: string) {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.patch(`/auth/update-avatar/${userId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

export function changeCurrentPassword(data: ChangeCurrPass, userId: string) {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.patch(`/auth/change-password`, data)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
