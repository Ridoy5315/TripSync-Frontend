import LiveRideTracking from "@/pages/user/LiveRideTracking";
import ProfileManagement from "@/pages/user/ProfileManagement";
import RideDetails from "@/pages/user/RideDetails";
import RideHistory from "@/pages/user/RideHistory";
import RideRequestForm from "@/pages/user/RideRequestForm";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    //     user: {
    //       name: "shadcn",
    //       email: "m@example.com",
    //       avatar: "/avatars/shadcn.jpg",
    //     },
    //     title: "History",
    //     icon: SquareTerminal,
    //     isActive: true,
    //     items: [
    //      {
    //           title: "Ride Request",
    //           url: "/user/ride-request",
    //           component: RideRequestForm
    //      },
    //      {
    //           title: "Live Ride Tracking",
    //           url: "/user/live-tracking",
    //           component: LiveRideTracking
    //      }
    //     ]
    title: "Ride Request",
    url: "/user/ride/ride-request",
    component: RideRequestForm,
  },
  {
    title: "Live Ride Tracking",
    url: "/user/ride/live-tracking",
    component: LiveRideTracking,
  },
  {
    title: "Ride Details Page",
    url: "/user/ride/details/:id",
    component: RideDetails,
  },
  {
    title: "My Ride History",
    url: "/user/ride/history",
    component: RideHistory,
  },
  {
    title: "Profile Management",
    url: "/user/profile",
    component: ProfileManagement,
  },
];
