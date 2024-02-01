import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import {
  changeCurrentPassword,
  fetchUser,
  loginUser,
  logOutUser,
  registerUser,
  updateProfile,
  updateUser,
  updateUserAvatar,
} from "./authAPI"
import { AuthStateType, ChangeCurrPass, LoginUserType } from "./authTypes"
import { AxiosError } from "axios"
import toast from "react-hot-toast"

const initialState: AuthStateType = {
  user: null,
  status: "idle",
  updateStatus: "idle",
}

export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (data: FormData) => {
    try {
      const res = await registerUser(data)
      return res.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  },
)

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (data: LoginUserType) => {
    try {
      const res = await loginUser(data)
      return res.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  },
)

export const logOutUserThunk = createAsyncThunk("auth/logOutUser", async () => {
  try {
    const res = await logOutUser()
    return res.data
  } catch (error) {
    const err = error as AxiosError
    return err.response?.data
  }
})

export const fetchUserThunk = createAsyncThunk("auth/fetchUser", async () => {
  try {
    const res = await fetchUser()
    return res.data
  } catch (error) {
    const err = error as AxiosError
    return err.response?.data
  }
})

export const updateUserThunk = createAsyncThunk(
  "auth/updateUser",
  async ({ userId, data }: { userId: string; data: {} }) => {
    try {
      const res = await updateUser(userId, data)
      return res.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  },
)

export const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async ({ userId, data }: { userId: string; data: {} }) => {
    try {
      const res = await updateProfile(userId, data)
      return res.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  },
)

export const updateUserAvatarThunk = createAsyncThunk(
  "auth/updateUserAvatar",
  async ({ userId, data }: { userId: string; data: FormData }) => {
    try {
      const res = await updateUserAvatar(data, userId)
      return res.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  },
)

export const changeCurrentPasswordThunk = createAsyncThunk(
  "auth/changeCurrentPassword",
  async ({ data, userId }: { data: ChangeCurrPass; userId: string }) => {
    try {
      const res = await changeCurrentPassword(data, userId)
      return res.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  },
)

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = "idle"
        state.user = action.payload.user
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = "idle"
      })
    builder
      .addCase(loginUserThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = "idle"
        state.user = action.payload.user
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = "idle"
      })
    builder
      .addCase(fetchUserThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.status = "idle"
        state.user = action.payload.user
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.status = "idle"
      })
    builder
      .addCase(logOutUserThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(logOutUserThunk.fulfilled, (state, action) => {
        state.status = "idle"
        state.user = null
      })
      .addCase(logOutUserThunk.rejected, (state, action) => {
        state.status = "idle"
      })
    builder
      .addCase(updateUserThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.status = "idle"
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.status = "idle"
      })
    builder
      .addCase(updateProfileThunk.pending, (state, action) => {
        state.updateStatus = "loading"
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.updateStatus = "idle"
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.updateStatus = "idle"
      })
    builder
      .addCase(updateUserAvatarThunk.pending, (state, action) => {
        state.updateStatus = "loading"
      })
      .addCase(updateUserAvatarThunk.fulfilled, (state, action) => {
        state.updateStatus = "idle"
        state.user = action.payload.user
      })
      .addCase(updateUserAvatarThunk.rejected, (state, action) => {
        state.updateStatus = "idle"
      })
    builder
      .addCase(changeCurrentPasswordThunk.pending, (state, action) => {
        state.updateStatus = "loading"
      })
      .addCase(changeCurrentPasswordThunk.fulfilled, (state, action) => {
        state.updateStatus = "idle"
      })
      .addCase(changeCurrentPasswordThunk.rejected, (state, action) => {
        state.updateStatus = "idle"
      })
  },
})

export const selectCount = (state: RootState) => state.counter.value

export default authSlice.reducer
