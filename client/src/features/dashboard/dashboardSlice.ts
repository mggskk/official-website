import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { fetchStaff, fetchUsers } from "./dashboardAPI"
import { AxiosError } from "axios"
import { UserType } from "../auth/authTypes"

interface dashboardInitialState {
  users: null | UserType[]
  status: "idle" | "loading" | "failed"
  staff: null | UserType[]
}

const initialState: dashboardInitialState = {
  status: "idle",
  users: null,
  staff: null,
}

export const fetchUsersThunk = createAsyncThunk(
  "dashboard/fetchUsers",
  async () => {
    try {
      const res = await fetchUsers()
      return res.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  },
)

export const fetchStaffThunk = createAsyncThunk(
  "dashboard/fetchStaff",
  async () => {
    try {
      const res = await fetchStaff()
      return res.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  },
)

export const dashboardSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.users =
        state.users &&
        state.users?.map((user) => {
          if (user._id === action.payload._id) {
            return {
              ...user,
              ...action.payload,
            }
          }
          return user
        })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.status = "idle"
        state.users = action.payload.users.map((user: UserType) => ({
          ...user,
          status: "idle",
        }))
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.status = "idle"
      })
    builder
      .addCase(fetchStaffThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchStaffThunk.fulfilled, (state, action) => {
        state.status = "idle"
        state.staff = action.payload.staff
      })
      .addCase(fetchStaffThunk.rejected, (state, action) => {
        state.status = "idle"
      })
  },
})

export const { updateUserData } = dashboardSlice.actions

export default dashboardSlice.reducer
