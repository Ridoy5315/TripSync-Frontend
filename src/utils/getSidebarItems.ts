import { role } from "@/constants/role";
import { userSidebarItems } from "@/routes/userSidebarItem";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.user:
      return [...userSidebarItems];
    default:
      return [];
  }
};
