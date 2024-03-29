import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchStaffThunk } from "../../dashboard/dashboardSlice"
import { UserCircleIcon } from "@heroicons/react/24/outline"

export default function Staff() {
  const { staff } = useAppSelector((state) => state.dashboard)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchStaffThunk())
  }, [])
  return (
    <section className="p-4 flex flex-col items-center justify-center">
      <h1 className="main-heading">Staff</h1>
      <div className="join join-vertical w-full max-w-7xl bg-base-200">
        {staff &&
          staff.map((s, i) => (
            <div
              key={i}
              className="collapse collapse-plus join-item border-2 rounded border-base-300 "
            >
              <input
                type="radio"
                name="my-accordion-4"
                defaultChecked={i === 0}
              />
              <div className="collapse-title text-xl font-medium flex items-center">
                <div className="w-24 mask mask-squircle">
                  {s.avatar ? (
                    <img src={s.avatar?.secure_url} />
                  ) : (
                    <UserCircleIcon className="w-full h-auto text-neutral" />
                  )}
                </div>
                <span className="ml-2">
                  {s.firstName} {s.lastName}
                </span>
              </div>
              <div className="collapse-content">
                {s.subject && (
                  <p className="max-w-4xl">
                    <span className="font-semibold">Teaches - </span>
                    {s.subject}
                  </p>
                )}
                {s.description && <p className="max-w-4xl">{s.description}</p>}
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
