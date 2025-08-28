import { AppSidebar } from "@/components/app-sidebar";
import OnlineOfflineToggle from "@/components/OnlineOfflineToggle";
import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";
import { CircleArrowLeft } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function FeaturesLayout() {
  const { data } = useGetOwnInfoQuery(undefined);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb className="flex items-center gap-2">
              <BreadcrumbList>
                <Button className="h-8">
                  <Link
                    className="flex items-center gap-2
                  "
                    to="/"
                  >
                    <CircleArrowLeft />
                    Back To Home
                  </Link>
                </Button>
              </BreadcrumbList>
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              {data?.data?.role === "DRIVER" && (
                <BreadcrumbList>
                  <OnlineOfflineToggle></OnlineOfflineToggle>
                </BreadcrumbList>
              )}
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div> */}
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <Outlet></Outlet>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
