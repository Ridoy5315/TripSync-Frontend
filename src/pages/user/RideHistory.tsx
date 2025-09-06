import RideHistoryFilters from "@/components/rideHistory/RideHistoryFilters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRideHistoryQuery } from "@/redux/features/ride/ride.api";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function RideHistory() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetOwnInfoQuery(undefined);

  const status = searchParams.get("status") || undefined;
  const fareRange = searchParams.get("fareRange") || undefined;
  const selectedDate = searchParams.get("date") || undefined;

  let startUTC, endUTC;

  if (selectedDate) {
    // Treat date as UTC by splitting components
    const [year, month, day] = selectedDate.split("-").map(Number);

    const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

    startUTC = startDate.toISOString();
    endUTC = endDate.toISOString();
  }

  const { data: rideHistory, isLoading } = useRideHistoryQuery({
    userId: data?.data?.user?._id,
    params: {
      page: currentPage,
      ...(startUTC && { startDate: startUTC }),
      ...(endUTC && { endDate: endUTC }),
      ...(status && { status }),
      ...(fareRange && { fareRange }),
    },
  });

  const rides = rideHistory?.data;
  const totalPage = rideHistory?.meta?.totalPage || 1;

  return (
    <div className="py-4 px-8">
      <h3 className="text-primary font-semibold text-2xl mb-4">
        My Ride History :
      </h3>
      <RideHistoryFilters></RideHistoryFilters>
      <Separator className="my-8"></Separator>

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
                  <TableHead className="text-center">Request Status</TableHead>
                  <TableHead className="text-center">Requested At</TableHead>
                  <TableHead className="text-center">Fare</TableHead>
                  <TableHead className="text-right">Ride Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-left">
                      <Skeleton className="w-[30px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[110px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[110px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[110px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[110px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[110px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[110px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[110px] h-[25px]" />
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
                  <TableHead className="text-center">Request Status</TableHead>
                  <TableHead className="text-center">Requested At</TableHead>
                  <TableHead className="text-center">Fare</TableHead>
                  <TableHead className="text-right">Ride Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rides &&
                  rides.map((item, index: number) => (
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
                      <TableCell className="font-medium text-center">
                        {item?.rideRequestAction}
                      </TableCell>
                      <TableCell className="font-medium text-center">
                        {new Date(item.rideRequestAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium text-center">
                        {item?.originalFare}
                      </TableCell>
                      <TableCell className="font-medium text-right">
                        {item?.rideProgressStatus}
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

                  {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}
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
        </>
      )}
    </div>
  );
}
