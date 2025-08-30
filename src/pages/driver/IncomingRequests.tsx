import {
  useAcceptRideMutation,
  useGetAllPendingRidesQuery,
  useRejectRideMutation,
} from "@/redux/features/driver/driver.api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, CircleX, ReceiptText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import RideRequestDetailsModal from "@/components/modal/RideRequestDetailsModal";
import AcceptRideModal from "@/components/modal/AcceptRideModal";
import { toast } from "sonner";
import RejectRideModal from "@/components/modal/RejectRideModal";
export default function IncomingRequests() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllPendingRidesQuery({ page: currentPage });
  const [acceptRide] = useAcceptRideMutation();
  const [rejectRide] = useRejectRideMutation();

  const allPendingRideRequest = data?.allPendingRides;
  const totalPage = data?.meta?.totalPage;

  const handleAcceptRide = async (rideId: string) => {
    const toastId = toast.loading("Accepting...");
    try {
      const res = await acceptRide(rideId).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success("Ride accepted. Passenger is waiting for you.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      if (error?.data?.message === "You are in offline") {
        toast.error("You’re offline! Go online to start receiving rides.", {
          id: toastId,
        });
      }
      if (error?.data?.message === "You are in a trip") {
        toast.error(
          "You are currently on a trip. You cannot accept another ride.",
          {
            id: toastId,
          }
        );
      }
      if (error?.data?.message === "Ride not found") {
        toast.error("Ride not found.", { id: toastId });
      }
      if (error?.data?.message === "rider already canceled this ride") {
        toast.error("Passenger already canceled this ride.", { id: toastId });
      }
      if (error?.data?.message === "You are not authorized driver") {
        toast.error("Access denied: Your driver account is not yet approved.", {
          id: toastId,
        });
      }
      if (error?.data?.message === "You are not a driver") {
        toast.error("You are not a driver.", { id: toastId });
      }
    }
  };

  const handleRejectRide = async (rideId: string) => {
    const toastId = toast.loading("Rejecting...");
    try {
      const res = await rejectRide(rideId).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success("Ride rejected successfully.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      if (error?.data?.message === "You are in offline") {
        toast.error("Cannot reject ride while you are offline.", {
          id: toastId,
        });
      }
      if (error?.data?.message === "You are in a trip") {
        toast.error(
          "Please complete your ongoing trip before rejecting any ride.",
          {
            id: toastId,
          }
        );
      }
      if (error?.data?.message === "Ride not found") {
        toast.error("Ride not found.", { id: toastId });
      }
      if (error?.data?.message === "rider already canceled this ride") {
        toast.error("Passenger already canceled this ride.", { id: toastId });
      }
      if (error?.data?.message === "You are not authorized driver") {
        toast.error("Access denied: Your driver account is not yet approved.", {
          id: toastId,
        });
      }
      if (error?.data?.message === "You are not a driver") {
        toast.error("You are not a driver.", { id: toastId });
      }
    }
  };

  return (
    <div className="py-4 px-8">
      <h3 className="text-primary font-semibold text-2xl mb-4">
        Incoming Requests:
      </h3>

      {/* <Separator className="my-8"></Separator> */}
      <div className="border border-muted rounded-md">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">No.</TableHead>
              <TableHead className="text-center">
                Pickup Location (Coordinates)
              </TableHead>
              <TableHead className="text-center">
                Destination Location (Coordinates)
              </TableHead>
              <TableHead className="text-center">Distance</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allPendingRideRequest &&
              allPendingRideRequest.map((item, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-left">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    [{item?.pickupLocation?.coordinates[0]},{" "}
                    {item?.pickupLocation?.coordinates[1]}]
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    [{item?.destinationLocation?.coordinates[0]},{" "}
                    {item?.destinationLocation?.coordinates[0]}]
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {item?.distance}
                  </TableCell>
                  <TableCell className="font-medium text-center flex justify-center gap-2">
                    <RideRequestDetailsModal item={item}>
                      <Button>
                        <ReceiptText />
                      </Button>
                    </RideRequestDetailsModal>
                    <AcceptRideModal
                      onConfirm={() => handleAcceptRide(item?._id)}
                    >
                      <Button variant="outline">
                        <CircleCheckBig />
                      </Button>
                    </AcceptRideModal>
                    <RejectRideModal
                      onConfirm={() => handleRejectRide(item?._id)}
                    >
                      <Button>
                        <CircleX />
                      </Button>
                    </RejectRideModal>
                    {/* <Tooltip>
                      <TooltipTrigger asChild></TooltipTrigger>
                      <TooltipContent>
                        <p>Reject</p>
                      </TooltipContent>
                    </Tooltip> */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-8">
        {/* {totalPage > 1 && ( */}
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    currentPage === 1
                      ? "pointer-events-none text-gray-500"
                      : "cursor-pointer"
                  }
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                />
              </PaginationItem>
              {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none text-gray-500"
                      : "cursor-pointer"
                  }
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
