import type { ISidebarItem } from "@/types"

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
     return sidebarItems.map((route) => ({
          Component: route.component,
          path: route.url
     }))
}