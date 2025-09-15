import RidersManagementFilters from "@/components/ridersManagement/RidersManagementFilters";
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
import {
  useBlockUserMutation,
  useGetRiderQuery,
  useUnblockUserMutation,
} from "@/redux/features/admin/admin.api";
import type { IErrorResponse, IUser } from "@/types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function RidersManagement() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const isActiveValue = searchParams.get("isActiveValue") || undefined;
  const search = searchParams.get("search") || undefined;

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const { data, isLoading } = useGetRiderQuery({
    params: {
      page: currentPage,
      ...(isActiveValue && { isActiveValue }),
      ...(search && { searchTerm: search }),
    },
  });

  const totalPage = data?.meta?.totalPage || 1;
  const ridersData = data?.data;

  const handleRiderStatus = async (userId: string, value: string) => {

    try {
      if (value === "Block") {
        toast("Are you sure you want to block this rider?", {
          duration: Infinity,
          action: {
            label: "Yes, Block",
            onClick: async () => {
              const res = await blockUser(userId).unwrap();
              if (res.success) {
                toast.success("Rider blocked successfully!");
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
      } else if (value === "Unblock") {
        toast("Are you sure you want to unblock this rider?", {
          duration: Infinity,
          action: {
            label: "Yes, Unblock",
            onClick: async () => {
              const res = await unblockUser(userId).unwrap();
              if (res.success) {
                toast.success("User unblocked successfully!");
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
        toast.error("You are not permitted to block or unblock user.", {
          id: toastId,
        });
      }
      if (err.data.message === "this user not a blocked user") {
        toast.error("this user not a blocked user.", { id: toastId });
      }
      if (err.data.message === "this user already blocked") {
        toast.error("this user already blocked.", { id: toastId });
      }
    }
  };

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
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="lg:text-sm text-[10px]">
                {ridersData &&
                  ridersData?.map((item: IUser, index: number) => {
                    // 🔹 Decide the label for this row here
                    const actionLabel =
                      item?.isActive === "ACTIVE" ||
                      item?.isActive === "INACTIVE"
                        ? "Block"
                        : "Unblock";

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
                              item._id && handleRiderStatus(item._id, actionLabel)
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
