import { CheckBadgeIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchUsersThunk } from "./dashboardSlice"
import { useEffect, useState } from "react"
import Modal from "./components/Modal"
import { Navigate } from "react-router-dom"
import Loader from "../../utils/Loader"

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { users } = useAppSelector((state) => state.dashboard)
  const { user } = useAppSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)

  if (!user && !loading) {
    return <Navigate to={"/"} replace={true} />
  }

  useEffect(() => {
    dispatch(fetchUsersThunk())
      .then(() => setLoading(false))
      .catch(() => setLoading(false))

    document.title = "Dashboard | MGGS Kunchalwara Kalan"
  }, [])

  if (loading) {
    return <Loader />
  }
  return (
    <section className="min-h-screen m-4">
      <div>
        <h1 className="main-heading">Users</h1>
        <div className="w-full max-w-4xl mx-auto">
          {users &&
            users.map((user) => (
              <div
                key={user._id}
                className="collapse mt-2 collapse-arrow bg-base-200"
              >
                <Modal {...user} />

                <input type="radio" name="staff-accordion" />
                <div className="collapse-title text-xl font-medium">
                  <div className="avatar flex items-center ">
                    <div className="w-16 mask mask-squircle">
                      <img src={user.avatar?.secure_url} />
                    </div>
                    <p className="ml-2">
                      {user.firstName} {user.lastName}
                    </p>
                    {user.isEmailVerified && (
                      <CheckBadgeIcon className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </div>
                <div className="collapse-content">
                  <p>
                    <span className="font-semibold mr-2">Subject -</span>
                    {user.subject}
                  </p>
                  <p>
                    <span className="font-semibold mr-2">Email -</span>
                    {user.email}
                  </p>
                  <p>
                    <span className="font-semibold mr-2">Role -</span>
                    {user.role}
                  </p>
                  <p>
                    <span className="font-semibold mr-2">Description -</span>
                    {user.description}
                  </p>
                  <label
                    htmlFor={user._id}
                    className="  btn btn-neutral btn-sm"
                  >
                    <PencilSquareIcon className="w-4 h-6" />
                    Edit
                  </label>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
