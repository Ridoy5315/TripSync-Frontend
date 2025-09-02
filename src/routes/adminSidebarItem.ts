import AnalyticsDashboard from "@/pages/admin/AnalyticsDashboard";
import RideOversight from "@/pages/admin/RideOversight";
import type { ISidebarItem } from "@/types";
import { userSidebarItems } from "./userSidebarItem";
import RidersManagement from "@/pages/admin/RidersManagement";
import DriversManagement from "@/pages/admin/DriversManagement";
import AdminList from "@/pages/admin/AdminList";

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
    // optionally modify URL if needed (like prefixing with /driver/user-xyz)
    // or leave as-is if your routing supports /user/... for driver
  })),
];
