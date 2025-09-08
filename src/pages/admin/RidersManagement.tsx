import RidersManagementFilters from "@/components/ridersManagement/RidersManagementFilters";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRiderQuery } from "@/redux/features/admin/admin.api";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function RidersManagement() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const isActiveValue = searchParams.get("isActiveValue") || undefined;
  const search = searchParams.get("search") || undefined;

  const { data, isLoading } = useGetRiderQuery({
    params: {
      page: currentPage,
      ...(isActiveValue && { isActiveValue }),
      ...(search && { searchTerm: search }),
    },
  });

  const totalPage = data?.meta?.totalPage || 1;
  const ridersData = data?.data;

  // console.log(data?.data?.totalRider)
  console.log(data);
  return (
    <div className="py-4 lg:px-8 md:px-4 px-2">
      <h3 className="text-primary font-semibold lg:text-2xl text-xl mb-4">
        Riders Management :
      </h3>
      <RidersManagementFilters></RidersManagementFilters>
      <Separator className="lg:my-8 my-6"></Separator>
      {isLoading && (
        <>
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
                  <TableHead className="text-center">isActive</TableHead>
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
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader className="lg:text-sm md:text-sm text-xs">
                <TableRow>
                  <TableHead className="text-left">No.</TableHead>
                  <TableHead className="text-center">name</TableHead>
                  <TableHead className="text-center">email</TableHead>
                  <TableHead className="text-center">gender</TableHead>
                  <TableHead className="text-center">address</TableHead>
                  <TableHead className="text-center">isActive</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="lg:text-sm text-[10px]">
                {ridersData &&
                  ridersData?.map((item, index: number) => (
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
                      <TableCell className="font-medium text-center">
                        {item?.isActive === "ACTIVE" ||
                        item?.isActive === "INACTIVE"
                          ? "Unblock"
                          : "Block"}
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
