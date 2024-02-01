import { SubmitHandler, useForm } from "react-hook-form"
import { Logo } from "../../../Imgs"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { LoginUserType } from "../authTypes"
import { loginUserThunk } from "../authSlice"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"
import { useEffect } from "react"

export default function Login() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserType>()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status } = useAppSelector((state) => state.auth)

  const onSubmit: SubmitHandler<LoginUserType> = async (data) => {
    const res = await dispatch(loginUserThunk(data))
    try {
      if (res?.payload?.success) {
        toast.success(res.payload.msg)
        navigate(localStorage.getItem("location") || "/")
      } else if (!res?.payload?.success) {
        toast.error(res?.payload?.msg)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        toast.error(axiosError.message)
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  useEffect(() => {
    document.title = "Log in | MGGS Kunchalwara Kalan"
  }, [])

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="mx-auto h-32 shadow-lg w-auto rounded-full outline outline-gray-100" />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  autoComplete="email"
                  required
                  className="input input-bordered input-sm w-full"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input input-bordered input-sm w-full"
                />
              </div>
            </div>

            <div>
              <button
                disabled={status === "loading"}
                type="submit"
                className={`btn btn-sm btn-neutral w-full`}
              >
                {status === "loading" ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Log in"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Do not have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
