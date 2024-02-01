import { Link, useLocation } from "react-router-dom"
import { Logo } from "../Imgs"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  Bars3BottomLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import { logOutUserThunk } from "../features/auth/authSlice"
import toast from "react-hot-toast"
import { useEffect } from "react"
import Skeleton from "../utils/Skeleton"

const navigation = [
  { title: "Home", href: "/" },
  { title: "Hall of Frame", href: "/gallery" },
]

const authorizedNavigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
]

export default function Navbar() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { user, status } = useAppSelector((state) => state.auth)
  useEffect(() => {
    localStorage.setItem("location", `${location.pathname}`)
  }, [location.pathname])
  return (
    <div className="navbar bg-base-100 px-4 shadow">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-base lg:hidden">
            <Bars3BottomLeftIcon className="w-6 h-6 text-neutral font-semibold" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navigation.map((nav, i) => (
              <li
                key={i}
                className={` rounded-lg mx-1 ${
                  location.pathname === nav.href ? "bg-base-200" : ""
                }`}
              >
                <Link to={nav.href}>{nav.title}</Link>
              </li>
            ))}
            {user?.role === "ADMIN" &&
              authorizedNavigation.map((nav, i) => (
                <li
                  key={i}
                  className={` rounded-lg mx-1 ${
                    location.pathname === nav.href ? "bg-base-200" : ""
                  }`}
                >
                  <Link to={nav.href}>{nav.title}</Link>
                </li>
              ))}
          </ul>
        </div>
        <Link
          to={"/"}
          className="flex items-center justify-center text-xl font-semibold active:bg-base-300 px-2 cursor-pointer rounded py-1 sm:bg-base-200"
        >
          <Logo className="w-auto h-11 rounded-full mr-2" />
          MGGS
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navigation.map((nav, i) => (
            <li
              key={i}
              className={` rounded-lg mx-1 ${
                location.pathname === nav.href ? "bg-base-200" : ""
              }`}
            >
              <Link to={nav.href}>{nav.title}</Link>
            </li>
          ))}
          {user?.role === "ADMIN" &&
            authorizedNavigation.map((nav, i) => (
              <li
                key={i}
                className={` rounded-lg mx-1 ${
                  location.pathname === nav.href ? "bg-base-200" : ""
                }`}
              >
                <Link to={nav.href}>{nav.title}</Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="navbar-end">
        {status === "loading" ? (
          <Skeleton className="w-14 h-10 rounded-lg" />
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  {!user.avatar ? (
                    <UserCircleIcon className="w-8 h-8 text-neutral" />
                  ) : (
                    <img src={user.avatar?.secure_url} alt="User" />
                  )}
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>
              <li>
                <button
                  onClick={async () => {
                    const res = await dispatch(logOutUserThunk())
                    if (res?.payload?.success) {
                      localStorage.removeItem("location")
                      toast.success(res.payload.msg)
                    } else if (!res?.payload?.success) {
                      toast.success(res.payload.msg)
                    }
                  }}
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={"/login"} className="btn">
            Log in
          </Link>
        )}
      </div>
    </div>
  )
}
