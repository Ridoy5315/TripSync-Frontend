import type { ISidebarItem } from "@/types"

export const generateRoutes = (sidebarItems: ISidebarItem[], parentPath: string = ""): any[] => {
  return sidebarItems.flatMap((section) => {
    const routes: any[] = [];

    // Handle section itself
    if (section.url && section.component) {
      routes.push({
        path: section.url.startsWith("/") ? section.url : `${parentPath}${section.url}`,
        Component: section.component,
      });
    }

    // Handle nested items recursively
    if (section.items && section.items.length > 0) {
      routes.push(...generateRoutes(section.items, parentPath));
    }

    return routes;
  });
};

// return sidebarItems.map((route) => {
  //   let relativePath = route.url.replace(new RegExp(`^${parentPath}`), "");
  //   if (relativePath.startsWith("/")) {
  //     relativePath = relativePath.slice(1);
  //   }

  //   return {
  //     Component: route.component,
  //     path: relativePath || "/", 
  //   };
  // });