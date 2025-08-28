import type { ISidebarItem } from "@/types"

export const generateRoutes = (sidebarItems: ISidebarItem[], parentPath: string) => {
  return sidebarItems.map((route) => {
    let relativePath = route.url.replace(new RegExp(`^${parentPath}`), "");
    if (relativePath.startsWith("/")) {
      relativePath = relativePath.slice(1);
    }

    return {
      Component: route.component,
      path: relativePath || "/", 
    };
  });
};