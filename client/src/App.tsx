import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom"
import Layout from "./Layout"
import Home from "./features/home/Home"
import Login from "./features/auth/components/Login"
import Signup from "./features/auth/components/Signup"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { useAppDispatch } from "./app/hooks"
import { fetchUserThunk } from "./features/auth/authSlice"
import { Protected } from "./utils/Protected"
import Profile from "./features/auth/components/Profile"
import Gallery from "./features/gallery/components/Gallery"
import Dashboard from "./features/dashboard/Dashboard"
import Contact from "./features/contact/Contact"
import NotFound from "./features/not-found/NotFound"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/gallery",
    element: (
      <Layout>
        <Gallery />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Protected>
        <Login />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: (
      <Protected>
        <Signup />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUserThunk())
  }, [])

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  )
}

export default App
