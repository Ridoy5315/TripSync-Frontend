import RideOversightFilters from "@/components/rideOversight/RideOversightFilters";
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
import { useGetAllRidesQuery } from "@/redux/features/admin/admin.api";
import type { IRide } from "@/types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function RideOversight() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const status = searchParams.get("status") || undefined;
  const selectedDate = searchParams.get("date") || undefined;
  const riderGender = searchParams.get("riderGender") || undefined;

  let startUTC, endUTC;

  if (selectedDate) {
    // Treat date as UTC by splitting components
    const [year, month, day] = selectedDate.split("-").map(Number);

    const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

    startUTC = startDate.toISOString();
    endUTC = endDate.toISOString();
  }

  const { data, isLoading } = useGetAllRidesQuery({
    params: {
      page: currentPage,
      ...(startUTC && { startDate: startUTC }),
      ...(endUTC && { endDate: endUTC }),
      ...(status && { status }),
      ...(riderGender && { riderGender }),
    },
  });

  

  const ridesData = data?.data?.data;
  const totalPage = data?.data?.meta?.totalPage || 1;

  return (
    <div className="py-4 lg:px-8 md:px-4 px-2">
      <h3 className="text-primary font-semibold lg:text-2xl text-xl mb-4">
        Ride Oversight :
      </h3>
      <RideOversightFilters></RideOversightFilters>
      <Separator className="lg:my-8 my-6"></Separator>
      {isLoading && (
        <>
          <div className="border border-muted rounded-md">
            <Table>
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
                  <TableHead className="text-center">Fare</TableHead>
                  <TableHead className="text-center">Requested At</TableHead>
                  <TableHead className="text-center">Request Status</TableHead>
                </TableRow>
              </TableHeader>
               <TableBody>
                {Array.from({ length: 10 }).map((_, index) => (
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
                      <Skeleton className="w-[150px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[150px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[150px] h-[25px]" />
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      <Skeleton className="w-[150px] h-[25px]" />
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
                  <TableHead className="text-center">Fare</TableHead>
                  <TableHead className="text-center">Requested At</TableHead>
                  <TableHead className="text-center">Request Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="lg:text-sm text-[10px]">
                {ridesData &&
                  ridesData.map((item : IRide, index: number) => (
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
                        {item?.originalFare} $
                      </TableCell>
                      <TableCell className="font-medium text-center">
                        {item?.rideRequestAt ? new Date(item.rideRequestAt).toLocaleString() : "N/A"}
                      </TableCell>
                      <TableCell className="font-medium text-center">
                        {item?.rideRequestAction}
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
        </>
      )}
    </div>
  );
}
