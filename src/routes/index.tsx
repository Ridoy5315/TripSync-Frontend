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
import { adminSidebarItems } from "./adminSidebarItem";
import Success from "@/pages/payment/Success";
import Fail from "@/pages/payment/Fail";
import Cancel from "@/pages/payment/cancel";

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
               { index: true, Component: () => <Navigate to="/user/ride/ride-request" replace /> },
               ...generateRoutes(userSidebarItems, "/user")
          ],
     },
     {
          Component: withAuth(FeaturesLayout, role.driver as TRole),
          path: "/driver",
          children: [
               { index: true, element: <Navigate to="/driver/incoming-requests"></Navigate> },
               ...generateRoutes(driverSidebarItems, "/driver")
          ],
     },
     {
          Component: withAuth(FeaturesLayout, role.superAdmin as TRole),
          path: "/admin",
          children: [
               { index: true, element: <Navigate to="/admin/riders"></Navigate> },
               ...generateRoutes(adminSidebarItems, "/admin")
          ],
     },
     {
          Component: withAuth(FeaturesLayout, role.admin as TRole ),
          path: "/admin",
          children: [
               { index: true, element: <Navigate to="/admin/riders"></Navigate> },
               ...generateRoutes(adminSidebarItems, "/admin")
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
     },
     {
          Component: Success,
          path: "/payment/success"
     },
     {
          Component: Fail,
          path: "/payment/fail"
     },
     {
          Component: Cancel,
          path: "/payment/cancel"
     },
])