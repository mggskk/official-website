import Footer from "./features/home/components/Footer"
import Navbar from "./navbar/Navbar"

export interface ChildrenPropType {
  children: React.ReactNode
}

export default function Layout({ children }: ChildrenPropType) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  )
}
