import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"

export default function MainLayout({children}) {
  return (
    <div>
     <Navbar></Navbar>
     <div>{children}</div>
     <Footer></Footer>
    </div>
  )
}
