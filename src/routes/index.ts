import App from "@/App";
import AboutUs from "@/pages/AboutUs";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router";
export 
const router = createBrowserRouter([
     {
          Component: App,
          path: "/",
          children: [
               {
                    Component: HomePage,
                    index: true
               },
               {
                    Component: AboutUs,
                    path: "aboutUs"
               }
          ]
     }
])