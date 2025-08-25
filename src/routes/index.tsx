import App from "@/App";
import AboutUs from "@/pages/AboutUs";
import SignIn from "@/pages/authentication/SignIn";
import SignUp from "@/pages/authentication/SignUp";
import Verify from "@/pages/authentication/Verify";
import Features from "@/pages/Features";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import DeletedAccount from "@/pages/DeletedAccount";
import BlockedAccount from "@/pages/BlockedAccount";
import InactiveAccount from "@/pages/InactiveAccount";
import { withAuth } from "@/utils/withAuth";
import FeaturesLayout from "@/layout/FeaturesLayout";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Unauthorized from "@/pages/Unauthorized";
import { generateRoutes } from "@/utils/generateRoutes";
import { userSidebarItems } from "./userSidebarItem";
import { driverSidebarItems } from "./driverSidebarItem";

export const router = createBrowserRouter([
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
          Component: withAuth(FeaturesLayout, role.user as TRole),
          path: "/user",
          children: [
               { index: true, element: <Navigate to="/user/ride/ride-request"></Navigate> },
               ...generateRoutes(userSidebarItems)
          ],
     },
     {
          Component: withAuth(FeaturesLayout, role.driver as TRole),
          path: "/driver",
          children: [
               { index: true, element: <Navigate to="/driver/availability"></Navigate> },
               ...generateRoutes(driverSidebarItems)
          ],
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
     {
          Component: DeletedAccount,
          path: "/account-deleted"
     },
     {
          Component: BlockedAccount,
          path: "/account-blocked"
     },
     {
          Component: InactiveAccount,
          path: "/account-inactive"
     },
     {
          Component: Unauthorized,
          path: "/unauthorized"
     }
])