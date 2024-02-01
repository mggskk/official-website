import axios from "axios"
import { env } from "./constants"

export const API = axios.create({
  baseURL: env.SERVER_URI,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})
