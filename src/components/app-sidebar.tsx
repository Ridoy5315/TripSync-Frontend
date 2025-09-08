import * as React from "react";
import Logo from "@/assets/companyLogo/company_logo.png";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Link } from "react-router-dom";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: GalleryVerticalEnd,
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: AudioWaveform,
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: Command,
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "Playground",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "#",
//         },
//         {
//           title: "Starred",
//           url: "#",
//         },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData, isLoading } = useGetOwnInfoQuery(undefined);
  const data = {
    navMain: getSidebarItems(userData?.data?.user?.role),
  };

  console.log(data);

  const footerData = {
    name: userData?.data?.user?.name,
    email: userData?.data?.user?.email,
    avatar: userData?.data?.user?.picture,
  };
  return (
    <Sidebar className="lg:px-2 px-1 " {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="flex items-center lg:gap-2 gap-1 py-1">
          <img className="lg:h-10 h-8" src={Logo} alt="" />
          <p className="lg:text-2xl text-xl">
            <span>Trip</span>Sync
          </p>
        </div>
      </SidebarHeader>
      <DropdownMenuSeparator />
      {isLoading && (
        <SidebarContent className="list-none pl-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div>
                <Skeleton className="w-[190px] h-[32px] rounded"></Skeleton>
              </div>
            </SidebarMenuButton>

            <div className="ml-4 flex flex-col my-4 gap-3">
              <Skeleton className="w-[190px] h-[32px] rounded"></Skeleton>
              <Skeleton className="w-[190px] h-[32px] rounded"></Skeleton>
            </div>
            <SidebarMenuButton asChild>
              <div className="mt-5">
                <Skeleton className="w-[190px] h-[32px] rounded"></Skeleton>
              </div>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <div className="mt-5">
                <Skeleton className="w-[190px] h-[32px] rounded"></Skeleton>
              </div>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <div className="mt-5">
                <Skeleton className="w-[190px] h-[32px] rounded"></Skeleton>
              </div>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <div className="mt-5">
                <Skeleton className="w-[190px] h-[32px] rounded"></Skeleton>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarContent>
      )}
      {!isLoading && (
        <SidebarContent className="list-none pl-4">
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              {/* isActive={item.isActive} */}
              {item.title === "Profile Management" && (
                <div className="border-t-2 lg:my-2 my-1"></div>
              )}
              <SidebarMenuButton asChild>
                <Link to={item.url}>{item.title}</Link>
              </SidebarMenuButton>
              {item.title === "Completed Rides" && (
                <div className="border-t-2 lg:my-2 my-1"></div>
              )}
              {item.title === "Admin List" && (
                <div className="border-t-2 lg:my-2 my-1"></div>
              )}
              {item.items && item.items.length > 0 && (
                <div className="ml-4 flex flex-col my-2 gap-1">
                  {item.items.map((section, index) => (
                    <Link key={index} to={section.url}>
                      {section.title}
                    </Link>
                  ))}

                  {/* <SidebarMenuList items={item.items} /> */}
                </div>
              )}
              {item.items &&
                item.items.length > 0 &&
                item.items.some(
                  (section) => section.title === "Drivers Management"
                ) && <div className="border-t-2 lg:my-2 my-1"></div>}
            </SidebarMenuItem>
          ))}
        </SidebarContent>
      )}

      <DropdownMenuSeparator />
      <SidebarFooter className="p-1 lg:p-4">
        <NavUser user={footerData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
