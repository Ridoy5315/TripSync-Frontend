import DriversManagementFilters from "@/components/driversManagement/DriversManagementFilters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetDriverQuery,
  useGetRiderQuery,
} from "@/redux/features/admin/admin.api";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
export default function DriversManagement() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const driverApprovalStatus = searchParams.get("driverApprovalStatus") || undefined;
  const search = searchParams.get("search") || undefined;

  const { data } = useGetDriverQuery({
    params: {
      page: currentPage,
      ...(driverApprovalStatus && { driverApprovalStatus }),
      ...(search && { searchTerm: search }),
    },
  });

  console.log(data);

  const totalPage = data?.totalDriver?.meta?.totalPage || 1;
  const driversData = data?.totalDriver?.data;

  return (
    <div className="py-4 px-8">
      <h3 className="text-primary font-semibold text-2xl mb-4">
        My Ride History :
      </h3>
      <DriversManagementFilters></DriversManagementFilters>
      <Separator className="my-4"></Separator>
      <div className="border border-muted rounded-md">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">No.</TableHead>
              <TableHead className="text-center">name</TableHead>
              <TableHead className="text-center">email</TableHead>
              <TableHead className="text-center">gender</TableHead>
              <TableHead className="text-center">address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {driversData &&
              driversData?.map((item, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-left">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {item?.name}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {item?.email}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {item?.gender}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {item?.address}
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
