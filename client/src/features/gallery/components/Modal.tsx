import { CloudArrowUpIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { uploadPhotoThunk } from "../gallerySlice"
import toast from "react-hot-toast"

export default function Modal() {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const { status } = useAppSelector((state) => state.gallery)
  const dispatch = useAppDispatch()

  return (
    <div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-semibold text-3xl">Add Photo</h3>
          <div className="divider"></div>
          <form
            onSubmit={handleSubmit(async (data) => {
              const formData = new FormData()
              formData.append("title", data.title)

              const imgList = [...data.img]
              for (let i = 0; i < imgList.length; i++) {
                formData.append(`img`, imgList[i])
              }

              const res = await dispatch(uploadPhotoThunk(formData))
              if (res?.payload?.success) {
                toast.success(res?.payload?.msg)
                reset()
              } else {
                toast.error(res.payload.msg)
              }
            })}
          >
            <div className="flex flex-col ">
              <label htmlFor="title" className="label label-text font-semibold">
                Event Title
              </label>
              <input
                type="text"
                {...register("title", { required: "Event title is required" })}
                placeholder="Type here"
                className="input input-bordered input-md w-full  "
              />
              {errors?.title && (
                <p className="text-error text-sm ml-1">{`${errors.title.message}`}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <label htmlFor="title" className="label label-text font-semibold">
                Select image (max 10 at a time)
              </label>
              <input
                type="file"
                {...register("img", {
                  required: "At least one image is required",
                })}
                multiple
                className="file-input file-input-bordered file-input-ghost w-full "
                accept="image/*"
              />
              {errors?.img && (
                <p className="text-error text-sm ml-1">{`${errors.img.message}`}</p>
              )}
            </div>
            <div className="flex flex-col  mt-4 ">
              <button
                disabled={status === "loading"}
                className={`btn ${
                  status === "loading" ? "btn-disabled" : "btn-neutral"
                }`}
              >
                {status === "loading" ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <>
                    <CloudArrowUpIcon className="w-6 h-6 " />
                    <span>Upload</span>
                  </>
                )}
              </button>
            </div>
          </form>
          <div className="divider"></div>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn w-full">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
