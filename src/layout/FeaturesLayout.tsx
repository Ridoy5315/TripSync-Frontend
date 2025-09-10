import ActiveRideManagement from "@/components/ActiveRideManagement";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useGetActiveRideStatusQuery } from "@/redux/features/driver/driver.api";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";
import { CircleArrowLeft, MoveRight } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function FeaturesLayout() {
  const { data, isLoading } = useGetOwnInfoQuery(undefined);

  const { data: rideData } = useGetActiveRideStatusQuery(undefined);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="">
        <header className="flex lg:h-16 h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center lg:gap-2 gap-1 lg:px-4 md:px-4 px-3 w-full">
            <SidebarTrigger className="lg:-ml-1 md:-ml-1 -ml-2" />
            <Separator
              orientation="vertical"
              className="lg:mr-2 md:mr-2 mr-0 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb className="flex items-center gap-2 w-full">
              <BreadcrumbList>
                <Button className="lg:!h-9 md:!h-8 !h-7 lg:text-sm text-xs lg:px-4 md:px-2 px-1">
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
                className="lg:mx-2 md:mx-0.5 data-[orientation=vertical]:h-4"
              />
              {isLoading && (
                <BreadcrumbList>
                  <Skeleton className="w-[368px] h-[32px]" />
                </BreadcrumbList>
              )}
              {!isLoading && data?.data?.user?.role === "DRIVER" && (
                <BreadcrumbList>
                  <OnlineOfflineToggle></OnlineOfflineToggle>
                </BreadcrumbList>
              )}
               <Separator
                orientation="vertical"
                className="lg:mx-2 md:mx-0.5  data-[orientation=vertical]:h-4"
              />
              {rideData?.data?.rideRequestAction === "ACCEPTED" &&
                rideData?.data?.rideProgressStatus &&
                rideData?.data?.rideProgressStatus !== "COMPLETED" && (
                  <div className="lg:ml-auto flex items-center gap-2">
                    <span className="text-muted-foreground text-sm lg:block hidden">
                      Update the current ride status
                    </span>
                    <MoveRight strokeWidth={1.75} className="lg:block hidden"/>
                    <BreadcrumbList>
                      <ActiveRideManagement></ActiveRideManagement>
                    </BreadcrumbList>
                  </div>
                )}
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 lg:p-4 p-2 pt-0 ">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <Outlet></Outlet>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
