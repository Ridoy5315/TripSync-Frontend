
import type { ISidebarItem } from "@/types";
import { userSidebarItems } from "./userSidebarItem";
import { lazy } from "react";

const IncomingRequests = lazy(() => import("@/pages/driver/IncomingRequests"));
const EarningsDashboard = lazy(() => import("@/pages/driver/EarningsDashboard"));
const CompletedRides = lazy(() => import("@/pages/driver/CompletedRides"));

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Incoming Requests",
    url: "/driver/incoming-requests",
    component: IncomingRequests,
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
  })),

];
