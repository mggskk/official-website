import { SubmitHandler, useForm } from "react-hook-form"
import { Logo } from "../../../Imgs"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { registerUserThunk } from "../authSlice"
import { RegisterUserType, UserType } from "../authTypes"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"
import { PhotoIcon } from "@heroicons/react/24/outline"
import { availableGenders } from "../../../constants"
import { useEffect } from "react"

export default function Signup() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserType>()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status } = useAppSelector((state) => state.auth)

  const avatar = watch("avatar")

  const onSubmit: SubmitHandler<RegisterUserType> = async (data) => {
    const formData = new FormData()
    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("gender", data.gender)
    formData.append("description", data.description)
    formData.append("subject", data.subject)
    if (data.avatar) {
      formData.append("avatar", data.avatar[0])
    }
    const res = await dispatch(registerUserThunk(formData))
    try {
      if (res?.payload?.success) {
        toast.success(res.payload.msg)
        navigate("/")
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
    document.title = "Sign Up | MGGS Kunchalwara Kalan"
  }, [])

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="mx-auto h-32 shadow-lg w-auto rounded-full outline " />
          <h2 className="main-heading">Create an account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  {...register("firstName", {
                    required: "firstName is required",
                  })}
                  type="text"
                  className="input input-bordered input-sm w-full rounded"
                />
              </div>
              {errors.firstName && (
                <p className="text-error text-sm ml-1">{`${errors.firstName.message}`}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  {...register("lastName", {
                    required: "lastName is required",
                  })}
                  type="test"
                  className="input input-bordered input-sm w-full rounded"
                />
              </div>
              {errors.lastName && (
                <p className="text-error text-sm ml-1">{`${errors.lastName.message}`}</p>
              )}
            </div>

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
                  className="input input-bordered input-sm w-full rounded"
                />
              </div>
              {errors.email && (
                <p className="text-error text-sm ml-1">{`${errors.email.message}`}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
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
                  className="input input-bordered input-sm w-full rounded"
                />
              </div>
              {errors.password && (
                <p className="text-error text-sm ml-1">{`${errors.password.message}`}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>
              </div>
              <div className="mt-2">
                <select
                  className="select select-bordered select-sm rounded w-full "
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option disabled selected>
                    --Select Gender--
                  </option>
                  {availableGenders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              {errors.gender && (
                <p className="text-error text-sm ml-1">{`${errors.gender.message}`}</p>
              )}
            </div>

            <div>
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
                  type="text"
                  required
                  className="input input-bordered input-sm w-full rounded"
                  placeholder="For teachers only"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <textarea
                {...register("description")}
                id="name"
                className="textarea textarea-bordered w-full mt-2"
                placeholder="For teachers only"
              ></textarea>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profile picture
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className={`mx-auto h-12 w-12 ${
                      avatar && avatar[0] ? "text-primary" : "text-gray-300"
                    }`}
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    {avatar && avatar[0] ? (
                      avatar[0]?.name
                    ) : (
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-neutral focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral focus-within:ring-offset-2 "
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          {...register("avatar")}
                          type="file"
                          className="sr-only"
                          accept="image/*"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-sm btn-neutral w-full">
                {status === "loading" ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold leading-6 text-neutral">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
