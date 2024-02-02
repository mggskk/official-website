import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useAppSelector } from "../../../app/hooks"
import Modal from "./Modal"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { deleteImgThunk, fetchImagesThunk, togglePage } from "../gallerySlice"
import Loader from "../../../utils/Loader"
import { useSearchParams } from "react-router-dom"
import Skeleton from "../../../utils/Skeleton"
import toast from "react-hot-toast"

export default function Gallery() {
  const dispatch = useDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { status, images, page } = useAppSelector((state) => state.gallery)

  const [searchParams, setSearchParams] = useSearchParams()

  let pageNum = searchParams.get("page")
  useEffect(() => {
    window.scrollTo(0, 0)
    if (pageNum === null) {
      setSearchParams({
        page: "1",
      })
    }
    document.title = "Hall of Frame | MGGS Kunchalwara Kalan"
  }, [])

  useEffect(() => {
    dispatch(togglePage(Number(pageNum)))
    dispatch(fetchImagesThunk(Number(pageNum)) as any)
  }, [pageNum, page])

  return (
    <div className="w-full p-4 ">
      <h1 className="main-heading">Hall of frame</h1>

      {user && (user.role == "ADMIN" || user.role === "STAFF") && (
        <div className="py-2 flex items-center justify-end">
          <label htmlFor="my_modal_6" className="btn btn-ghost">
            <PlusCircleIcon className="w-10 h-10 text-neutral" />
          </label>
        </div>
      )}
      <Modal />

      <div className="masonry sm:masonry-sm md:masonry-md ">
        {status === "loading" ? (
          <div>
            <Skeleton className="h-44 w-full max-w-xs my-2" />
            <Skeleton className="h-44 w-full max-w-xs my-2" />
            <Skeleton className="h-44 w-full max-w-xs my-2" />
          </div>
        ) : (
          images?.map((img, i) => {
            return (
              <div
                className={`rounded-lg bg-transparent shadow break-inside 
                ${i == 0 ? "" : "mt-[1.25rem]"}
                `}
                key={img._id}
              >
                <img src={img.img_link.secure_url} className={`rounded-t`} />

                <div className="flex justify-between items-center p-2">
                  {img.title}
                  {user && user.role === "ADMIN" && (
                    <button
                      className="btn btn-ghost btn-sm w-auto px-1"
                      onClick={async () => {
                        const res = await dispatch(
                          deleteImgThunk({
                            imgId: img._id,
                            img_public_id: img.img_link.public_id,
                          }) as any,
                        )
                        if (res?.payload?.success) {
                          toast.success(res?.payload?.msg)
                        } else {
                          toast.error(res?.payload?.msg)
                        }
                      }}
                    >
                      <TrashIcon className="w-6 h-6 text-error" />
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
      <div className="join grid grid-cols-2 my-8 max-w-xl mx-auto">
        <button
          onClick={() => {
            setSearchParams({
              page: (Number(pageNum) - 1).toString(),
            })
            window.scrollTo(0, 0)
          }}
          className={`join-item btn btn-outline ${
            page === 1 ? "btn-disabled" : ""
          }`}
        >
          Previous page
        </button>
        <button
          onClick={() => {
            setSearchParams({
              page: (Number(pageNum) + 1).toString(),
            })
            window.scrollTo(0, 0)
          }}
          className={`join-item btn btn-outline ${
            images && images.length < 15 ? "btn-disabled" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
