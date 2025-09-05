
import type { ISidebarItem } from "@/types";
import { userSidebarItems } from "./userSidebarItem";
import { lazy } from "react";

const RidersManagement = lazy(() => import("@/pages/admin/RidersManagement"));
const DriversManagement = lazy(() => import("@/pages/admin/DriversManagement"));
const RideOversight = lazy(() => import("@/pages/admin/RideOversight"));
const AnalyticsDashboard = lazy(() => import("@/pages/admin/AnalyticsDashboard"));
const AdminList = lazy(() => import("@/pages/admin/AdminList"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Users Management",
    items: [
      {
        title: "Riders Management",
        url: "/admin/riders",
        component: RidersManagement,
      },
      {
        title: "Drivers Management",
        url: "/admin/drivers",
        component: DriversManagement,
      },
    ],
  },
  {
    title: "Ride Oversight",
    url: "/admin/rides",
    component: RideOversight,
  },
  {
    title: "Analytics Dashboard",
    url: "/admin/analytics",
    component: AnalyticsDashboard,
  },
  {
    title: "Admin List",
    url: "/admin/campaigns",
    component: AdminList,
  },

  // Spread user sidebar items below
  ...userSidebarItems.map((item) => ({
    ...item,
    url: `user${item.url}`,
  })),
];
