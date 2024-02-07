import { Link, useLocation } from "react-router-dom"
import { Logo } from "../Imgs"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { UserIcon } from "@heroicons/react/24/outline"
import { logOutUserThunk } from "../features/auth/authSlice"
import toast from "react-hot-toast"
import { useEffect } from "react"
import Skeleton from "../utils/Skeleton"

const navigation = [
  { title: "Home", href: "/" },
  { title: "Gallery", href: "/gallery" },
]

const authorizedNavigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
]

import { Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/outline"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Navbar() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { user, status } = useAppSelector((state) => state.auth)
  useEffect(() => {
    localStorage.setItem("location", `${location.pathname}`)
  }, [location.pathname])
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-4">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3BottomLeftIcon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link
                    to={"/"}
                    className="btn btn-ghost bg-transparent hover:bg-gray-900 px-2 text-white text-xl"
                  >
                    <Logo className="w-auto h-11 rounded-full mr-1 lg:mr-2" />
                    MGGS
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4  h-full items-center">
                    {navigation.map((item) => (
                      <Link
                        key={item.title}
                        to={item.href}
                        className={`  ${
                          location.pathname === item.href
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                          rounded-md px-3 py-2 text-sm font-medium`}
                      >
                        {item.title}
                      </Link>
                    ))}
                    {user &&
                      user.role === "ADMIN" &&
                      authorizedNavigation.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className={`  ${
                            location.pathname === item.href
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          }
                          rounded-md px-3 py-2 text-sm font-medium`}
                        >
                          {item.title}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}

                {status === "loading" ? (
                  <Skeleton className="w-14 h-8 rounded bg-neutral" />
                ) : user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {user?.avatar ? (
                          <img
                            className="h-10 w-auto rounded-full"
                            src={user?.avatar?.secure_url}
                            alt="User profile image"
                          />
                        ) : (
                          <UserIcon className="w-8 h-8 text-gray-300 outline rounded-full" />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}
                            >
                              My Profile
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-left",
                              )}
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
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link to={`/login`} className="btn btn-sm ">
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`
                 ${
                   location.pathname === item.href
                     ? "bg-gray-900 text-white"
                     : "text-gray-300 hover:bg-gray-700 hover:text-white"
                 }
               block rounded-md px-3 py-2 text-base font-medium
              `}
                >
                  <Disclosure.Button className={`w-full text-left`}>
                    {item.title}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
