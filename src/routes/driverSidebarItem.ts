import ActiveRide from "@/pages/driver/ActiveRide";
import AvailabilityControl from "@/pages/driver/AvailabilityControl";
import EarningsDashboard from "@/pages/driver/EarningsDashboard";
import IncomingRequests from "@/pages/driver/IncomingRequests";
import type { ISidebarItem } from "@/types";
import { userSidebarItems } from "./userSidebarItem";
import CompletedRides from "@/pages/driver/CompletedRides";


export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Availability Control",
    url: "/driver/availability",
    component: AvailabilityControl,
  },
  {
    title: "Incoming Requests",
    url: "/driver/incoming-requests",
    component: IncomingRequests,
  },
  {
    title: "Active Ride Management",
    url: "/driver/active-ride",
    component: ActiveRide,
  },
  {
    title: "Earnings Dashboard",
    url: "/driver/earnings",
    component: EarningsDashboard,
  },
  {
    title: "Completed Rides",
    url: "/driver/ride-history",
    component: CompletedRides,
  },
    // Spread user sidebar items below
  ...userSidebarItems.map(item => ({
    ...item,
    url: `user${item.url}`,
    // optionally modify URL if needed (like prefixing with /driver/user-xyz)
    // or leave as-is if your routing supports /user/... for driver
  })),

];
