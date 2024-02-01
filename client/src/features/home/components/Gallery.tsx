import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useEffect } from "react"
import { fetchImagesThunk } from "../../gallery/gallerySlice"
import Loader from "../../../utils/Loader"

export default function Gallery() {
  const dispatch = useAppDispatch()
  const { images, status } = useAppSelector((state) => state.gallery)

  useEffect(() => {
    dispatch(fetchImagesThunk(1))
  }, [])
  return (
    <div className="w-full p-4 border-b-2">
      <h1 className="main-heading">Hall of frame</h1>

      <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
        {status === "loading" ? (
          <Loader />
        ) : (
          images?.map((img) => (
            <img
              key={img._id}
              src={img.img_link.secure_url}
              className="rounded"
            />
          ))
        )}
      </div>
      <div className="flex justify-center items-center">
        <Link to={"/gallery"} className="btn btn-base mt-2">
          See all
        </Link>
      </div>
    </div>
  )
}
