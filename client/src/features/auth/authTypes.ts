import { z } from "zod"

export interface UserType {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: "USER" | "STAFF" | "ADMIN"
  gender: "MALE" | "FEMALE"
  avatar?: {
    secure_url: string
    public_id: string
  }
  subject: string
  description: string
  isEmailVerified: boolean
  status: "idle" | "loading"
}

export interface RegisterUserType {
  firstName: string
  lastName: string
  email: string
  password: string
  avatar?: FileList
  description: string
  subject: string
  gender: string
}

export interface LoginUserType {
  email: string
  password: string
}

export interface AuthStateType {
  user: UserType | null
  status: "idle" | "loading" | "failed"
  updateStatus: "idle" | "loading"
}

export interface ChangeCurrPass {
  oldPassword: string
  newPassword: string
}

export const userDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  isEmailVerified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const registerUserSchema = z.object({
  success: z.boolean(),
  msg: z.string(),
  data: z.union([userDataSchema, z.undefined()]),
})
