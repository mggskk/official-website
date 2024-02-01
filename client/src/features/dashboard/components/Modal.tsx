import { XMarkIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { UserType } from "../../auth/authTypes"
import { availableUserRoles } from "../../../constants"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { updateUserThunk } from "../../auth/authSlice"
import toast from "react-hot-toast"
import { updateUserData } from "../dashboardSlice"

export default function Modal(user: UserType) {
  const { register, handleSubmit } = useForm()
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.auth)

  return (
    <div>
      <input type="checkbox" id={user._id} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h1 className="font-bold text-xl">Edit staff member</h1>
          <form
            onSubmit={handleSubmit(async (data) => {
              const res = await dispatch(
                updateUserThunk({ userId: user._id, data }),
              )
              if (res.payload?.success) {
                toast.success(res.payload.msg)
                dispatch(updateUserData(res.payload.user))
              } else {
                toast.error(res.payload.msg)
              }
            })}
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="role"
                  className="label label-text font-semibold"
                >
                  Role
                </label>
              </div>
              <div>
                <select
                  className="select select-bordered select-sm fonsem w-full ml-1"
                  {...register("role")}
                  id="role"
                  defaultValue={user.role}
                >
                  {availableUserRoles.map((role, i) => {
                    return (
                      <option key={i} value={role}>
                        {role}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>

            <div className="mt-2">
              <div className="form-control w-fit">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox"
                    {...register("isEmailVerified")}
                    defaultChecked={user.isEmailVerified}
                  />
                  <span className="label-text ml-2">Set user verified</span>
                </label>
              </div>
            </div>

            <button
              disabled={status === "loading"}
              className={`btn btn-sm ${
                status === "loading" ? "btn-disabled" : "btn-neutral"
              } mt-2 w-full ml-1`}
            >
              {status === "loading" ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
          <div className="modal-action">
            <label
              htmlFor={user._id}
              className="btn btn-sm btn-ghost rounded-full absolute top-2 right-2 m-0 p-1"
            >
              <XMarkIcon className="w-6 h-6 " />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
