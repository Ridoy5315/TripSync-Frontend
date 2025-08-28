import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItem";
import { driverSidebarItems } from "@/routes/driverSidebarItem";
import { userSidebarItems } from "@/routes/userSidebarItem";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.user:
      return [...userSidebarItems];
    case role.driver:
      return [...driverSidebarItems];
    case role.admin:
      return [...adminSidebarItems];
    case role.superAdmin:
      return [...adminSidebarItems];
    default:
      return [];
  }
};
