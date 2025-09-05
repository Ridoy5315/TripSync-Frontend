import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const RideRequestForm = lazy(() => import("@/pages/user/RideRequestForm"));
const RideDetails = lazy(() => import("@/pages/user/RideDetails"));
const RideHistory = lazy(() => import("@/pages/user/RideHistory"));
const ProfileManagement = lazy(() => import("@/pages/user/ProfileManagement"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Ride Request",
    url: "/user/ride/ride-request",
    component: RideRequestForm,
  },
  {
    title: "Ride Details",
    url: "/user/ride/details",
    component: RideDetails,
  },
  {
    title: "Ride History",
    url: "/user/ride/history",
    component: RideHistory,
  },
  {
    title: "Profile Management",
    url: "/user/profile",
    component: ProfileManagement,
  },
];
