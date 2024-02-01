import { useEffect } from "react"
import Carousel from "./components/Carousel"
import Gallery from "./components/Gallery"
import Staff from "./components/Staff"
import { carouselImgArray } from "../../constants"

export default function Home() {
  useEffect(() => {
    document.title = "Home | MGGS Kunchalwara Kalan"
  }, [])
  return (
    <>
      <Carousel autoSlide={true}>
        {[
          ...carouselImgArray.map((s, i) => (
            <img
              src={s}
              key={i}
              className="w-full h-[200px] sm:h-auto object-cover aspect-[24/9] rounded"
            />
          )),
        ]}
      </Carousel>
      <Gallery />
      <Staff />
    </>
  )
}
