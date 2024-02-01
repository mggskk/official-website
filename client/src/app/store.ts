import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import authReducer from "../features/auth/authSlice"
import galleryReducer from "../features/gallery/gallerySlice"
import dashboardReducer from "../features/dashboard/dashboardSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    gallery: galleryReducer,
    dashboard: dashboardReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
