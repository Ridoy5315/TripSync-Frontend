import AdminSearchFilter from "@/pages/admin/AdminSearchFilter";
import AnalyticsDashboard from "@/pages/admin/AnalyticsDashboard";
import RideOversight from "@/pages/admin/RideOversight";
import UserManagement from "@/pages/admin/UserManagement";
import type { ISidebarItem } from "@/types";
import { userSidebarItems } from "./userSidebarItem";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "User Management",
    url: "/admin/users",
    component: UserManagement,
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
    title: "Purpose / Display",
    url: "/admin/campaigns",
    component: AdminSearchFilter,
  },

  // Spread user sidebar items below
  ...userSidebarItems.map((item) => ({
    ...item,
    url: `user${item.url}`,
    // optionally modify URL if needed (like prefixing with /driver/user-xyz)
    // or leave as-is if your routing supports /user/... for driver
  })),
];
