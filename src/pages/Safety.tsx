import { AddEmergencyContactModal } from "@/components/modal/AddEmergencyContactModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";
import { CircleX } from "lucide-react";

export default function Safety() {
  const { data, isLoading } = useGetOwnInfoQuery(undefined);

  const userData = data?.data?.user;

  return (
    <div className="container mx-auto px-10 my-16">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center">
        <h3 className="lg:text-4xl md:text-4xl text-3xl font-semibold text-pretty text-center">
          Emergency Contact
        </h3>
        <div className=" space-y-5">
          <div>
            <AddEmergencyContactModal userId={userData?._id}></AddEmergencyContactModal>
          </div>
          {isLoading && (
            <div className="border border-muted rounded-md">
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">No.</TableHead>
                    <TableHead className="text-center">
                      Pickup Location (Coordinates)
                    </TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 2 }).map((_, index) => (
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {!isLoading && (
            <div className="">
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader className="lg:text-sm md:text-sm text-xs">
                  <TableRow>
                    <TableHead className="text-left">No.</TableHead>
                    <TableHead className="text-center">
                      Contact (Email)
                    </TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="lg:text-sm text-xs">
                  {userData &&
                    userData?.emergencyContact.map((item: string[], index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-left">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium text-center">
                          {item}
                        </TableCell>
                        <TableCell className="font-medium text-center flex justify-center gap-2">
                          <Button>
                            <CircleX />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
