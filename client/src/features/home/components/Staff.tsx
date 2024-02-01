import { PlusIcon } from "@heroicons/react/24/outline"
import Modal from "../../dashboard/components/Modal"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchStaffThunk } from "../../dashboard/dashboardSlice"

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
                  <img src={s.avatar?.secure_url} />
                </div>
                <span className="ml-2">
                  {s.firstName} {s.lastName}
                </span>
              </div>
              <div className="collapse-content">
                <p className="max-w-4xl">
                  <span className="font-semibold">Teaches - </span>
                  {s.subject}
                </p>
                <p className="max-w-4xl">{s.description}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
