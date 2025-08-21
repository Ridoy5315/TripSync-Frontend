import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"
import type { ReactNode } from "react"

interface IProps {
  children: ReactNode;
}

export default function MainLayout({children}: IProps) {
  return (
    <div>
     <Navbar></Navbar>
     <div>{children}</div>
     <Footer></Footer>
    </div>
  )
}
