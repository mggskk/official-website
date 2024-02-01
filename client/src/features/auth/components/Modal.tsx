import { XMarkIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { UserType } from "../../auth/authTypes"
import { availableUserRoles } from "../../../constants"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { changeCurrentPasswordThunk } from "../../auth/authSlice"
import toast from "react-hot-toast"

interface FormValues {
  currentPassword: string
  newPassword: string
  confNewPass: string
}

export default function Modal({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const dispatch = useAppDispatch()
  const { updateStatus } = useAppSelector((state) => state.auth)

  return (
    <div>
      <input
        type="checkbox"
        id="change_password_modal"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h1 className="font-bold text-xl">Change password</h1>
          <form
            onSubmit={handleSubmit(async (data) => {
              if (data.newPassword !== data.confNewPass) {
                toast.error("Confirm your password correctly")
                return
              }

              const res = await dispatch(
                changeCurrentPasswordThunk({
                  userId,
                  data: {
                    oldPassword: data.currentPassword,
                    newPassword: data.newPassword,
                  },
                }),
              )
              if (res.payload?.success) {
                toast.success(res.payload.msg)
              } else {
                toast.error(res.payload.msg)
              }
            })}
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="currentPass"
                  className="label label-text font-semibold"
                >
                  Current password
                </label>
              </div>
              <div>
                <input
                  type="password"
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                  id="currentPass"
                  className="input input-bordered w-full input-sm"
                />
              </div>
              {errors.currentPassword && (
                <p className="text-xs text-error">
                  {errors?.currentPassword?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="newPass"
                  className="label label-text font-semibold"
                >
                  New password
                </label>
              </div>
              <div>
                <input
                  type="password"
                  {...register("newPassword", {
                    required: "New password is required",
                  })}
                  id="newPass"
                  className="input input-bordered w-full input-sm"
                />
              </div>
              {errors.newPassword && (
                <p className="text-xs text-error">
                  {errors?.newPassword?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confNewPass"
                  className="label label-text font-semibold"
                >
                  Confirm new password
                </label>
              </div>
              <div>
                <input
                  type="password"
                  {...register("confNewPass", {
                    required: "Confirm the new password",
                  })}
                  id="confNewPass"
                  className="input input-bordered w-full input-sm"
                />
              </div>
              {errors.confNewPass && (
                <p className="text-xs text-error">
                  {errors?.confNewPass?.message}
                </p>
              )}
            </div>

            <button
              disabled={updateStatus === "loading"}
              className={`btn btn-sm ${
                updateStatus === "loading" ? "btn-disabled" : "btn-neutral"
              } mt-2 w-full ml-1`}
            >
              {updateStatus === "loading" ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
          <div className="modal-action">
            <label
              htmlFor="change_password_modal"
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
