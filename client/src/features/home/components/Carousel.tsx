import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline"
import React, { useState, useEffect } from "react"

interface CarouselProps {
  children: React.ReactNode[]
  autoSlide?: boolean
  autoSlideInterval?: number
}

export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}: CarouselProps) {
  const [curr, setCurr] = useState(0)

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  useEffect(() => {
    if (!autoSlide) {
      return
    }
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [])

  return (
    <div className="px-4 my-4 rounded">
      <div className="overflow-hidden relative max-w-7xl ">
        <div
          className="flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides}
        </div>
        <div className="absolute inset-0 flex items-center justify-between sm:p-4 ">
          <button
            onClick={prev}
            className="btn px-1 opacity-70 hover:opacity-100 btn-sm btn-neutral"
          >
            <ArrowLeftCircleIcon className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="btn px-1 opacity-70 hover:opacity-100 btn-sm btn-neutral"
          >
            <ArrowRightCircleIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((s, i) => (
              <div
                key={i}
                className={`transition-all w-1.5 h-1.5 bg-white rounded-full  ${
                  curr === i ? "p-0.5" : "bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
