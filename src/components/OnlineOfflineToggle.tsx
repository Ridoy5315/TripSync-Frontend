import { useId, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { MoveRight } from "lucide-react";
import {
  useAvailabilityStatusChangeMutation,
  useGetAvailabilityStatusQuery,
} from "@/redux/features/driver/driver.api";
import { toast } from "sonner";

export default function OnlineOfflineToggle() {
  const id = useId();
  const { data: availabilityStatusData, isLoading } =
    useGetAvailabilityStatusQuery(undefined);
  const [availabilityStatus] = useAvailabilityStatusChangeMutation();
  const [checked, setChecked] = useState<boolean>(false);

  const status = availabilityStatusData?.data?.availabilityStatus;

  // Sync backend status with local state
  useEffect(() => {
    if (status) {
      
      setChecked(status === "ONLINE" || status === "ON_TRIP");
    }
  }, [status]);

  const handleStatusChange = async (newStatus: boolean) => {
    if (status === "ON_TRIP" && newStatus === false) {
    return toast.warning("You’re currently on a trip. Please complete the ride before going offline."); 
  }
    setChecked(newStatus);
    try {
      const res = await availabilityStatus().unwrap();
      console.log(res);
  //     if (res.success) {
  //   return toast.warning("You’re currently on a trip. Please complete the ride before going offline."); 
  // }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // or skeleton/spinner
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className={`${
          checked ? "text-muted-foreground" : "text-pretty font-semibold"
        }`}
      >
        {checked
          ? "You are online. You can go offline anytime"
          : "You’re offline! Go online to start receiving rides"}
      </span>
      <MoveRight strokeWidth={1.75} />
      <div className="relative inline-grid h-8 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={handleStatusChange}
          className="peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto rounded-md [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-sm [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="pointer-events-none relative ms-0.5 flex items-center justify-center px-1 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
          <span className="text-[10px] font-medium uppercase">Off</span>
        </span>
        <span className="peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 flex items-center justify-center px-1 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
          <span className="text-[10px] font-medium uppercase">On</span>
        </span>
      </div>
    </div>
  );
}
