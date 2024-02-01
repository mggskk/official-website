import { Navigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { ChildrenPropType } from "../Layout"

export function Protected({ children }: ChildrenPropType) {
  const { user } = useAppSelector((state) => state.auth)

  if (user) {
    return (
      <Navigate to={localStorage.getItem("location") || "/"} replace={true} />
    )
  }

  return children
}
