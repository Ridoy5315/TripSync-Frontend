import App from "@/App";
import AboutUs from "@/pages/AboutUs";
import SignIn from "@/pages/authentication/SignIn";
import SignUp from "@/pages/authentication/SignUp";
import Verify from "@/pages/authentication/Verify";
import Features from "@/pages/Features";
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
               },
               {
                    Component: Features,
                    path: "features"
               },
          ]
     },
     {
          Component: SignIn,
          path: "/signin"
     },
     {
          Component: SignUp,
          path: "/signUp"
     },
     {
          Component: Verify,
          path: "/verify"
     },
])