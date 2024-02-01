import { AxiosResponse } from "axios"
import { API } from "../../config/axiosInstance"

export function uploadPhoto(data: FormData) {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.post("/gallery/upload-photo", data, {
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

export function fetchImages(page: number) {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.get("/gallery/images", {
        params: {
          page,
        },
      })
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

export function deleteImg(imgId: string, img_public_id: string) {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const res = await API.delete(`/gallery/delete-image/${imgId}`, {
        data: {
          img_public_id,
        },
      })
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}
