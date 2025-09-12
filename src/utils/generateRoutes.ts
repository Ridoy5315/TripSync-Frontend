import type { ISidebarItem } from "@/types"
import type { ComponentType } from "react";

interface IRoute {
  path: string;
  Component: ComponentType; // React component
}

export const generateRoutes = (sidebarItems: ISidebarItem[], parentPath: string = ""): IRoute[] => {
  return sidebarItems.flatMap((section) => {
    const routes: IRoute[] = [];

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
