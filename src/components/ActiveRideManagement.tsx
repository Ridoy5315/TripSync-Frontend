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
import SOSButtonModal from "./modal/SOSButtonModal";

export default function ActiveRideManagement() {
  const { data: rideData } = useGetActiveRideStatusQuery(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const status = rideData?.data?.rideProgressStatus;
  const rideId = rideData?.data?._id;

  const [pickedUpStatus] = usePickedUpStatusMutation();
  const [inTransitStatus] = useInTransitStatusMutation();
  const [completedStatus] = useCompletedStatusMutation();

  useEffect(() => {
    if (status) {
      setSelectedStatus(status);
    }
  }, [status, rideData]);

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

  type RideStatusUpdate = "NOT_STARTED" | "PICKED_UP" | "IN_TRANSIT" | "COMPLETED";

  const changeRideStatus = async (value: RideStatusUpdate) => {
    const toastId = toast.loading("Signing you in...");
    try {
      if (value === "PICKED_UP") {
        const res = await pickedUpStatus(rideId).unwrap();

        if (res?.success) {
          toast.success("Ride progress updated to Picked Up.", { id: toastId });
        }
      }
      if (value === "IN_TRANSIT") {
        const res = await inTransitStatus(rideId).unwrap();

        if (res?.success) {
          toast.success("Ride progress updated to In Transit.", {
            id: toastId,
          });
        }
      }
      if (value === "COMPLETED") {
        const res = await completedStatus(rideId).unwrap();

        if (res?.success) {
          toast.success("Ride completed successfully!", { id: toastId });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex lg:gap-2 md:gap-2 gap-1">
      <Select 
        value={selectedStatus}
        onValueChange={(value) => changeRideStatus(value as RideStatusUpdate)}
      >
        <SelectTrigger className="lg:w-[180px] md:w-[120px] lg:!h-9 md:!h-8 !h-7 lg:!text-sm !text-xs lg:px-3 md:px-3 px-2">
          <SelectValue placeholder="Ride status" className="lg:text-sm md:text-sm text-xs"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {activeRide?.map((item) => (
              <SelectItem key={item.value} value={item.value} className="lg:text-sm text-xs ">
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <SOSButtonModal></SOSButtonModal>
    </div>
  );
}
