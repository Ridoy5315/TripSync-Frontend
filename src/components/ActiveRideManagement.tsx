import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCompletedStatusMutation,
  useGetActiveRideStatusQuery,
  useInTransitStatusMutation,
  usePickedUpStatusMutation,
} from "@/redux/features/driver/driver.api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ActiveRideManagement() {
  const { data: rideData } = useGetActiveRideStatusQuery(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const status = rideData?.data?.rideProgressStatus;
  const rideId = rideData?.data?._id;
  console.log(status);

  const [pickedUpStatus] = usePickedUpStatusMutation();
  const [inTransitStatus] = useInTransitStatusMutation();
  const [completedStatus] = useCompletedStatusMutation();

  useEffect(() => {
    if (status) {
      console.log(rideData);
      setSelectedStatus(status);
    }
  }, [status]);

  const activeRide = [
    {
      label: "Not Started",
      value: "NOT_STARTED",
    },
    {
      label: "Picked Up",
      value: "PICKED_UP",
    },
    {
      label: "In Transit",
      value: "IN_TRANSIT",
    },
    {
      label: "Completed",
      value: "COMPLETED",
    },
  ];

  const changeRideStatus = async (value) => {
    console.log(value);
    const toastId = toast.loading("Signing you in...");
    try {
      if (value === "PICKED_UP") {
        const res = await pickedUpStatus(rideId).unwrap();
        console.log(res);
        if (res?.success) {
          toast.success("Ride progress updated to Picked Up.", { id: toastId });
        }
      }
      if (value === "IN_TRANSIT") {
        const res = await inTransitStatus(rideId).unwrap();
        console.log(res);
        if (res?.success) {
          toast.success("Ride progress updated to In Transit.", {
            id: toastId,
          });
        }
      }
      if (value === "COMPLETED") {
        const res = await completedStatus(rideId).unwrap();
        console.log(res);
        if (res?.success) {
          toast.success("Ride completed successfully!", { id: toastId });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Select
      value={selectedStatus}
      onValueChange={(value) => changeRideStatus(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ride status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {activeRide?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
