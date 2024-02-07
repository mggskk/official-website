import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../../app/hooks"
import {
  CheckBadgeIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateProfileThunk, updateUserAvatarThunk } from "../authSlice"
import Skeleton from "../../../utils/Skeleton"
import { useForm } from "react-hook-form"
import { availableGenders } from "../../../constants"
import toast from "react-hot-toast"
import Modal from "./Modal"

export default function Profile() {
  const dispatch = useDispatch()
  const { user, status, updateStatus } = useAppSelector((state) => state.auth)
  const { register, handleSubmit } = useForm()

  const [disableInps, setDisableInps] = useState(true)

  if (!user) {
    return <Navigate to={"/login"} replace={true} />
  }

  if (status === "loading") {
    return (
      <div className="outline outline-gray-200 w-full max-w-7xl mx-auto py-8 px-2 sm:px-8 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className=" rounded-full relative">
              <Skeleton className="w-24 aspect-square rounded-full" />
            </div>
            {/* <h2 className="text-2xl font-semibold ml-4">My Profile</h2> */}
            <Skeleton className="w-48 h-8 ml-4" />
          </div>
        </div>
        <form>
          <div className=" pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Skeleton className="w-full h-9 rounded max-w-3xl" />
              </div>
              <div className="sm:col-span-3">
                <Skeleton className="w-full h-9 rounded max-w-3xl" />
              </div>
              <div className="sm:col-span-3">
                <Skeleton className="w-full h-9 rounded max-w-3xl" />
              </div>
              <div className="sm:col-span-3">
                <Skeleton className="w-full h-9 rounded max-w-3xl" />
              </div>
              <div className="sm:col-span-6">
                <Skeleton className="w-full h-9 rounded max-w-3xl" />
              </div>
              <div className="sm:col-span-6">
                <Skeleton className="w-full h-9 rounded max-w-3xl" />
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <section className="px-4 py-8">
      <div className="outline outline-gray-200 w-full max-w-7xl mx-auto py-8 px-2 sm:px-8 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className=" rounded-full bg-gray-200 relative">
              {user?.avatar ? (
                <div className="w-24 h-24 flex items-center justify-center">
                  {updateStatus === "loading" ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    <img
                      src={user?.avatar?.secure_url}
                      alt="Profile img"
                      className="rounded-full"
                    />
                  )}

                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className="hidden"
                    accept="image/*"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const formData = new FormData()
                        formData.append("avatar", e.target.files[0])
                        console.log("avatar - ", formData.get("avatar"))
                        const res = await dispatch(
                          updateUserAvatarThunk({
                            data: formData,
                            userId: user._id,
                          }) as any,
                        )
                        if (res?.payload?.success) {
                          toast.success(res.payload.msg)
                        } else {
                          toast.error(res.payload.msg)
                        }
                      } else {
                        toast.error("Image did not get selected")
                      }
                    }}
                  />
                </div>
              ) : (
                <UserCircleIcon className="w-16 h-16 text-neutral" />
              )}
              {updateStatus === "idle" && !disableInps && (
                <label
                  htmlFor="avatar"
                  className="bg-base-100 rounded-full p-1 absolute bottom-0 right-0 outline outline-gray-200"
                >
                  <PencilSquareIcon className="w-6 h-6 " />
                  {/* <span className="loading loading-spinner loading-md p-0 m-0"></span> */}
                </label>
              )}
            </div>
            <h2 className="text-2xl font-semibold ml-4">My Profile</h2>
          </div>
          {!user?.isEmailVerified && (
            <CheckBadgeIcon
              className="h-10 w-10 text-primary"
              title="Verified account"
            />
          )}
        </div>
        <button
          className="btn btn-sm mt-4"
          onClick={() => setDisableInps(!disableInps)}
          type="button"
        >
          {!disableInps ? "Disable profile editing" : "Enable profile editing"}
        </button>
        <form
          onSubmit={handleSubmit(async (data) => {
            const res = await dispatch(
              updateProfileThunk({ userId: user._id, data }) as any,
            )
            if (res?.payload?.success) {
              toast.success(res.payload.msg)
            } else {
              toast.error(res.payload.msg)
            }
          })}
        >
          <div>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-neutral"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    defaultValue={user?.firstName}
                    {...register("firstName")}
                    id="first-name"
                    className="form-input"
                    disabled={disableInps}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("lastName")}
                    id="last-name"
                    defaultValue={user?.lastName}
                    className="form-input"
                    disabled={disableInps}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    id="gender"
                    className="select select-bordered select-sm w-full"
                    {...register("gender")}
                    disabled={disableInps}
                    defaultValue={user.gender}
                  >
                    {availableGenders.map((g) => {
                      return (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Role
                </label>
                <div className="mt-2">
                  <input
                    id="role"
                    name="role"
                    type="role"
                    autoComplete="role"
                    defaultValue={user?.role}
                    className="form-input"
                    disabled
                  />
                </div>
              </div>

              {(user?.role === "STAFF" || user?.role === "ADMIN") && (
                <div className="sm:col-span-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Subject
                  </label>
                  <div className="mt-2">
                    <input
                      id="subject"
                      {...register("subject")}
                      type="subject"
                      autoComplete="subject"
                      defaultValue={user?.subject}
                      className="form-input"
                      disabled={disableInps}
                    />
                  </div>
                </div>
              )}
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={user?.email}
                    className="form-input"
                    disabled
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description")}
                    autoComplete="description"
                    defaultValue={user?.description}
                    className="textarea w-full textarea-bordered"
                    disabled={disableInps}
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-end w-full sm:col-span-6">
                <label
                  htmlFor="change_password_modal"
                  className="btn btn-ghost btn-sm underline"
                >
                  Change password
                </label>

                <button
                  className="btn btn-neutral btn-sm ml-2"
                  disabled={disableInps}
                  type="submit"
                >
                  {updateStatus === "loading" ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
        <Modal userId={user._id} />
      </div>
    </section>
  )
}
