import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { ReceiptText } from "lucide-react";

export default function RideRequestDetailsModal({ children, item }) {
  //   const driverFare = rideFare(parseFloat(item.distance))
  const driverFare = (Number(item.originalFare) * 0.8).toFixed(2);
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ride Details</DialogTitle>

          <div className="flex gap-3 mt-3">
            <ul className="text-pretty space-y-2">
              <li>Pickup Location (Coordinates)</li>
              <li>Destination Location (Coordinates)</li>
              <li>Distance (km)</li>
              <li>Estimated Earnings</li>
              <li>Requested At</li>
              <li>Request Status</li>
            </ul>
            <ul className="text-pretty space-y-2">
              <li>:</li>
              <li>:</li>
              <li>:</li>
              <li>:</li>
              <li>:</li>
              <li>:</li>
            </ul>
            <ul className="text-muted-foreground space-y-2">
              <li>
                [{item?.pickupLocation?.coordinates[0]},{" "}
                {item?.pickupLocation?.coordinates[1]}]
              </li>
              <li>
                [{item?.destinationLocation?.coordinates[0]},{" "}
                {item?.destinationLocation?.coordinates[0]}]
              </li>
              <li>{item?.distance}</li>
              <li>{driverFare}</li>
              <li>{new Date(item.rideRequestAt).toLocaleString()}</li>
              <li>{item?.rideRequestAction}</li>
            </ul>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
