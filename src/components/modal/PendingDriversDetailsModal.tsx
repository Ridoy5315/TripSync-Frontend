import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  useAcceptOrRejectDriverMutation,
  useGetPendingDriversQuery,
} from "@/redux/features/admin/admin.api";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

export default function PendingDriversDetailsModal() {
  const [open, setOpen] = useState(false);
  const { data: drivers } = useGetPendingDriversQuery(undefined);

  const [acceptOrRejectDriver] =
    useAcceptOrRejectDriverMutation();

  const handleAcceptOrRejectDriver = async (value, userId) => {
    console.log(value, userId);

    const toastId = toast.loading("Please wait, updating...");

    try {
      const res = await acceptOrRejectDriver({ value, userId }).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success("Driver application accepted successfully.", {
          id: toastId,
        });
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      if (
        error?.data?.message === "Driver application rejected successfully."
      ) {
        toast.success("Driver application rejected successfully.", {
          id: toastId,
        });
        setOpen(false);
      }
      if (error?.data?.message === "User not found") {
        toast.error("No user exists with the provided information.", {
          id: toastId,
        });
        setOpen(false);
      }
      if (error?.data?.message === "User is deleted") {
        toast.error(
          "This user has deleted their account and is no longer available.",
          { id: toastId }
        );
        setOpen(false);
      }
      if (error?.data?.message === "Your account is is not verified") {
        toast.error(
          "Your account is not verified yet. Please verify your account.",
          { id: toastId }
        );
        setOpen(false);
      }
      if (
        error?.data?.message ===
        "User haven't apply for a driver in this platform"
      ) {
        toast.error(
          "The user has not applied to be a driver on this platform yet.",
          { id: toastId }
        );
        setOpen(false);
      }
    }
  };

  const pendingDriversCount = drivers?.data?.length;
  const pendingDrivers = drivers?.data;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={pendingDriversCount > 0 ? "destructive" : "outline"}
          className="cursor-pointer"
        >
          Driver Applications ({pendingDriversCount ?? 0} Pending)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Profile Info</DialogTitle>
        </DialogHeader>
        {pendingDrivers &&
          pendingDrivers.map((item) => (
            <>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label>Full Name</Label>
                    <Input
                      defaultValue={item?.driverInformation?.name}
                      disabled
                      placeholder="Name"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label>Email</Label>
                    <Input
                      defaultValue={item?.driverInformation?.email}
                      disabled
                      placeholder="Email"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label>Phone</Label>
                    <Input
                      defaultValue={item?.driverInformation?.phone}
                      disabled
                      placeholder="Phone"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label>Address</Label>
                    <Input
                      defaultValue={item?.driverInformation?.address}
                      disabled
                      placeholder="Address"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label>Birth Date</Label>
                    <Input
                      defaultValue={item?.driverInformation?.dateOfBirth}
                      disabled
                      placeholder="Birth date"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label>Gender</Label>
                    <Input
                      defaultValue={item?.driverInformation?.gender}
                      disabled
                      placeholder="Gender"
                    />
                  </div>
                </div>
              </div>
              <Separator></Separator>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Vehicle Info</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label>Brand</Label>
                    <Input
                      defaultValue={item?.vehicleInfo?.brand}
                      disabled
                      placeholder="Brand"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label>Model</Label>
                    <Input
                      defaultValue={item?.vehicleInfo?.model}
                      disabled
                      placeholder="Model"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label>License Plate</Label>
                    <Input
                      defaultValue={item?.vehicleInfo?.licensePlate}
                      disabled
                      placeholder="License plate"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label>Color</Label>
                    <Input
                      defaultValue={item?.vehicleInfo?.color}
                      disabled
                      placeholder="Color"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label>Manufacturing Year</Label>
                    <Input
                      defaultValue={item?.vehicleInfo?.manufacturingYear}
                      disabled
                      placeholder="1980"
                    />
                  </div>
                  <div className="flex justify-end items-end gap-2">
                    <Button
                      onClick={() =>
                        handleAcceptOrRejectDriver(
                          "REJECTED",
                          item?.driverInformation?._id
                        )
                      }
                      type="submit"
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() =>
                        handleAcceptOrRejectDriver(
                          "APPROVED",
                          item?.driverInformation?._id
                        )
                      }
                      type="submit"
                      variant="outline"
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ))}

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="cursor-pointer max-w-2/10 w-full"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
