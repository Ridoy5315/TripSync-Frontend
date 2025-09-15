import DriversManagementFilters from "@/components/driversManagement/DriversManagementFilters";
import PendingDriversDetailsModal from "@/components/modal/PendingDriversDetailsModal";
import { Button } from "@/components/ui/button";
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
import { useBlockUserMutation, useGetDriverQuery, useUnblockUserMutation } from "@/redux/features/admin/admin.api";
import type { IErrorResponse } from "@/types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function DriversManagement() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const driverApprovalStatus =
    searchParams.get("driverApprovalStatus") || undefined;
  const search = searchParams.get("search") || undefined;

  const [suspendDriver] = useBlockUserMutation();
  const [unsuspendDriver] = useUnblockUserMutation();

  const { data, isLoading: driverLoading } = useGetDriverQuery({
    params: {
      page: currentPage,
      ...(driverApprovalStatus && { driverApprovalStatus }),
      ...(search && { searchTerm: search }),
    },
  });

  const totalPage = data?.totalDriver?.meta?.totalPage || 1;
  const driversData = data?.totalDriver?.data;

  const handleDriverStatus = async (userId: string, value: string) => {

    try {
      if (value === "Suspend") {
        toast("Are you sure you want to suspend this driver?", {
          duration: Infinity,
          action: {
            label: "Yes, Suspend",
            onClick: async () => {
              const res = await suspendDriver(userId).unwrap();
              if (res.success) {
                toast.success("Driver suspended successfully!");
              }
            },
          },
          cancel: {
            label: "Cancel",
            onClick: () => {
              toast("Canceled");
            },
          },
        });
      } else if (value === "Unsuspend") {
        toast("Are you sure you want to unsuspend this driver?", {
          duration: Infinity,
          action: {
            label: "Yes, Unsuspend",
            onClick: async () => {
              const res = await unsuspendDriver(userId).unwrap();
              if (res.success) {
                toast.success("Driver unsuspend successfully!");
              }
            },
          },
          cancel: {
            label: "Cancel",
            onClick: () => {
              toast("Canceled");
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
      const err = error as IErrorResponse;

      if (
        err.data.message === "You are not permitted to block or unblock user"
      ) {
        toast.error("You are not permitted to suspend or unsuspend Driver.");
      }
      if (err.data.message === "this user not a blocked user") {
        toast.error("this user not a suspend user.");
      }
      if (err.data.message === "this user already blocked") {
        toast.error("this user already suspended.");
      }
    }
  };

  return (
    <div className="py-4 lg:px-8 md:px-4 px-2">
      <h3 className="text-primary font-semibold lg:text-2xl text-xl mb-4">
        Drivers Management :
      </h3>
      <div className="flex lg:flex-row flex-col gap-4 justify-between lg:items-end items-start">
        <PendingDriversDetailsModal></PendingDriversDetailsModal>
        <DriversManagementFilters></DriversManagementFilters>
      </div>
      <Separator className="my-4"></Separator>
      {driverLoading && (
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
      {!driverLoading && (
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
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="lg:text-sm text-[10px]">
                {driversData &&
                  driversData?.map((item, index: number) => {
                    // 🔹 Decide the label for this row here
                    const actionLabel =
                      item?.isActive === "ACTIVE" ||
                      item?.isActive === "INACTIVE"
                        ? "Suspend"
                        : "Unsuspend";

                    return (
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
                          <Button
                            onClick={() =>
                              item._id && handleDriverStatus(item._id, actionLabel)
                            }
                            variant="outline"
                          >
                            {actionLabel}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
