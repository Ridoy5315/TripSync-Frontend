import { useGetCompletedRidesQuery } from "@/redux/features/driver/driver.api";
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
import { Separator } from "@/components/ui/separator";
import CompletedRidesFilters from "@/components/completedRides/CompletedRidesFilters";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompletedRides() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

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

  const { data: ridesData, isLoading } = useGetCompletedRidesQuery({
    params: {
      page: currentPage,
      ...(startUTC && { startDate: startUTC }),
      ...(endUTC && { endDate: endUTC }),
      ...(fareRange && { fareRange }),
    },
  });

  console.log(ridesData?.data?.data);
  console.log(ridesData?.data?.meta);

  const completedRides = ridesData?.data?.data;
  const totalPage = ridesData?.data?.meta?.totalPage || 1;
  return (
    <div className="py-4 px-8">
      <h3 className="text-primary font-semibold text-2xl mb-4">
        My Ride History :
      </h3>
      <CompletedRidesFilters></CompletedRidesFilters>
      <Separator className="my-4"></Separator>
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
                  <TableHead className="text-center">Fare</TableHead>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedRides &&
                  completedRides?.map((item, index: number) => (
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
                        {item?.originalFare}
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
