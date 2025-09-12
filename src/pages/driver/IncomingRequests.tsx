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
import { useState } from "react";
import RideRequestDetailsModal from "@/components/modal/RideRequestDetailsModal";
import AcceptRideModal from "@/components/modal/AcceptRideModal";
import { toast } from "sonner";
import RejectRideModal from "@/components/modal/RejectRideModal";
import { Skeleton } from "@/components/ui/skeleton";
import type { IErrorResponse, IRide } from "@/types";
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
      if (res?.success) {
        toast.success("Ride accepted. Passenger is waiting for you.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      const err = error as IErrorResponse
      if (err?.data?.message === "You are in offline") {
        toast.error("You’re offline! Go online to start receiving rides.", {
          id: toastId,
        });
      }
      if (err?.data?.message === "You are in a trip") {
        toast.error(
          "You are currently on a trip. You cannot accept another ride.",
          {
            id: toastId,
          }
        );
      }
      if (err?.data?.message === "Ride not found") {
        toast.error("Ride not found.", { id: toastId });
      }
      if (err?.data?.message === "rider already canceled this ride") {
        toast.error("Passenger already canceled this ride.", { id: toastId });
      }
      if (err?.data?.message === "You are not authorized driver") {
        toast.error("Access denied: Your driver account is not yet approved.", {
          id: toastId,
        });
      }
      if (err?.data?.message === "You are not a driver") {
        toast.error("You are not a driver.", { id: toastId });
      }
    }
  };

  const handleRejectRide = async (rideId: string) => {
    const toastId = toast.loading("Rejecting...");
    try {
      const res = await rejectRide(rideId).unwrap();
      if (res?.success) {
        toast.success("Ride rejected successfully.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      const err = error as IErrorResponse
      if (err?.data?.message === "You are in offline") {
        toast.error("Cannot reject ride while you are offline.", {
          id: toastId,
        });
      }
      if (err?.data?.message === "You are in a trip") {
        toast.error(
          "Please complete your ongoing trip before rejecting any ride.",
          {
            id: toastId,
          }
        );
      }
      if (err?.data?.message === "Ride not found") {
        toast.error("Ride not found.", { id: toastId });
      }
      if (err?.data?.message === "rider already canceled this ride") {
        toast.error("Passenger already canceled this ride.", { id: toastId });
      }
      if (err?.data?.message === "You are not authorized driver") {
        toast.error("Access denied: Your driver account is not yet approved.", {
          id: toastId,
        });
      }
      if (err?.data?.message === "You are not a driver") {
        toast.error("You are not a driver.", { id: toastId });
      }
    }
  };

  return (
    <div className="py-4 lg:px-8 md:px-4 px-2">
      <h3 className="text-primary font-semibold lg:text-2xl text-xl mb-4">
        Incoming Requests:
      </h3>

      {isLoading && (
        <>
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
                {Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-left">
                      <Skeleton className="w-[40px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[180px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[180px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[180px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[180px] h-[25px]" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-8">
            <div>
              <Pagination>
                <PaginationContent>
                  <Skeleton className="w-[180px] h-[40px]" />
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </>
      )}
      {!isLoading && (
        <>
          <div className="border border-muted rounded-md">
            <Table>
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader className="lg:text-sm md:text-sm text-xs">
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
              <TableBody className="lg:text-sm text-xs">
                {allPendingRideRequest &&
                  allPendingRideRequest.map((item: Partial<IRide>, index: number) => (
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
                          onConfirm={() => item?._id && handleAcceptRide(item._id)}
                        >
                          <Button variant="outline">
                            <CircleCheckBig />
                            
                          </Button>
                        </AcceptRideModal>
                        <RejectRideModal
                          onConfirm={() => item?._id && handleRejectRide(item._id)}
                        >
                          <Button>
                            <CircleX />
                          </Button>
                        </RejectRideModal>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-8">
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
          </div>
        </>
      )}
    </div>
  );
}
