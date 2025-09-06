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
import { useSearchParams } from "react-router-dom";
import { useGetAdminsQuery } from "@/redux/features/admin/admin.api";
import AdminListFilters from "@/components/adminList/AdminListFilters";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminList() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const adminGender = searchParams.get("adminGender") || undefined;

  const { data, isLoading } = useGetAdminsQuery({
    params: {
      ...(search && { searchTerm: search }),
      ...(adminGender && { adminGender }),
    },
  });

  console.log(data);
  const adminData = data?.data?.data;
  return (
    <div className="py-4 px-8">
      <h3 className="text-primary font-semibold text-2xl mb-4">Admin List :</h3>
      <AdminListFilters></AdminListFilters>
      <Separator className="my-4"></Separator>
      {isLoading && (
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
              {adminData &&
                adminData?.map((item, index: number) => (
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
      )}
    </div>
  );
}
