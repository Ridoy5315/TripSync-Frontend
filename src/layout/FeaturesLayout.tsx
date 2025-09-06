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
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb className="flex items-center gap-2 w-full">
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
              {isLoading  && (
                <BreadcrumbList>
                  <Skeleton className="w-[368px] h-[32px]" />
                </BreadcrumbList>
              )}
              {!isLoading && data?.data?.user?.role === "DRIVER" && (
                <BreadcrumbList>
                  <OnlineOfflineToggle></OnlineOfflineToggle>
                </BreadcrumbList>
              )}
              {rideData?.data?.rideRequestAction === "ACCEPTED" &&
                rideData?.data?.rideProgressStatus &&
                rideData?.data?.rideProgressStatus !== "COMPLETED" && (
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">
                      Update the current ride status
                    </span>
                    <MoveRight strokeWidth={1.75} />
                    <BreadcrumbList>
                      <ActiveRideManagement></ActiveRideManagement>
                    </BreadcrumbList>
                  </div>
                )}
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <Outlet></Outlet>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
