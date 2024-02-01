import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { deleteImg, fetchImages, uploadPhoto } from "./galleryAPI"
import { AxiosError, AxiosResponse } from "axios"
import toast from "react-hot-toast"

export interface imgProps {
  _id: string
  title: string
  loading: boolean
  img_link: {
    public_id: string
    secure_url: string
  }
  createdAt: string
  updatedAt: string
}

export interface galleryState {
  page: number
  status: "idle" | "loading" | "failed"
  imgDeleteStatus: "idle" | "loading" | "failed"
  images: imgProps[] | null
  totalImages: number
}

const initialState: galleryState = {
  page: 1,
  imgDeleteStatus: "idle",
  status: "idle",
  images: null,
  totalImages: 0,
}

export const uploadPhotoThunk = createAsyncThunk(
  "gallery/uploadPhoto",
  async (data: FormData) => {
    try {
      const res = await uploadPhoto(data)
      return res.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  },
)

export const fetchImagesThunk = createAsyncThunk(
  "gallery/fetchImages",
  async (page: number) => {
    try {
      const res = await fetchImages(page)
      return res.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  },
)

export const deleteImgThunk = createAsyncThunk(
  "gallery/deleteImg",
  async ({
    imgId,
    img_public_id,
  }: {
    imgId: string
    img_public_id: string
  }) => {
    try {
      const res = await deleteImg(imgId, img_public_id)
      return res.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  },
)

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    togglePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPhotoThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(uploadPhotoThunk.fulfilled, (state, action) => {
        state.status = "idle"
      })
      .addCase(uploadPhotoThunk.rejected, (state, action) => {
        state.status = "idle"
      })
    builder
      .addCase(fetchImagesThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchImagesThunk.fulfilled, (state, action) => {
        state.status = "idle"
        state.images = action.payload.gallery.map((img: imgProps) => ({
          ...img,
          loading: false,
        }))
        // state.page = +action.payload.page
        state.totalImages = +action.payload.totalImgs
      })
      .addCase(fetchImagesThunk.rejected, (state, action) => {
        state.status = "idle"
      })
    builder
      .addCase(deleteImgThunk.pending, (state, action) => {
        state.imgDeleteStatus = "loading"
        toast("Deleting...", { duration: 3000 })
      })
      .addCase(deleteImgThunk.fulfilled, (state, action) => {
        state.imgDeleteStatus = "idle"
        state.images =
          state.images &&
          state.images?.filter((img) => img._id !== action.payload.imgId)
        toast.success(action.payload.msg)
      })
      .addCase(deleteImgThunk.rejected, (state, action) => {
        state.imgDeleteStatus = "idle"
        toast.error(action?.payload?.msg)
      })
  },
})

export const { togglePage } = gallerySlice.actions

export default gallerySlice.reducer
