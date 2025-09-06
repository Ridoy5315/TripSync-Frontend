import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRideDetailsQuery } from "@/redux/features/ride/ride.api";
// import moment from "moment";

export default function RideDetails() {
  const { data, isLoading } = useRideDetailsQuery(undefined);

  console.log(data);
  const rideDetails = data?.data?.rideDetails;
  const driverInfo = data?.data?.driverInfo;
  const vehicleInfo = data?.data?.vehicleInfo;

  return (
    <div className="py-4 px-8">
      {isLoading && (
        <>
          <h3>
            <Skeleton className="w-[180px] h-[32px]" />
          </h3>
          <Separator className="my-4"></Separator>
          {/* ride details */}

          <div className="grid grid-cols-2">
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="w-[320px] h-[24px]" />
              ))}
            </div>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="w-[320px] h-[24px]" />
              ))}
            </div>
          </div>
        </>
      )}
      {!isLoading && (
        <>
          {rideDetails?.rideProgressStatus === "COMPLETED" ? (
            <h3 className="text-primary font-semibold text-2xl">
              Your last ride details
            </h3>
          ) : (
            <h3 className="text-primary font-semibold text-2xl">
              Your current ride details :
            </h3>
          )}
          <Separator className="my-4"></Separator>
          {/* ride details */}
          {rideDetails && (
            <div className="grid grid-cols-2">
              <div className="flex gap-6">
                <ul className="text-pretty space-y-2">
                  <li>Pickup Location</li>
                  <li>Destination Location</li>
                  <li>Distance</li>
                  <li>Request Status</li>
                  <li>Requested At</li>
                  <li>Estimated Fare</li>
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
                    [{rideDetails?.pickupLocation?.coordinates[0]},{" "}
                    {rideDetails?.pickupLocation?.coordinates[1]}]
                  </li>
                  <li>
                    [{rideDetails?.destinationLocation?.coordinates[0]},{" "}
                    {rideDetails?.destinationLocation?.coordinates[0]}]
                  </li>
                  <li>{rideDetails.distance}</li>
                  <li>{rideDetails.rideRequestAction}</li>
                  <li>
                    {new Date(rideDetails.rideRequestAt).toLocaleString()}
                  </li>
                  <li>{rideDetails.originalFare}</li>
                </ul>
              </div>
              <div className="flex gap-6">
                <ul className="text-pretty space-y-2">
                  <li>Accepted At</li>
                  <li>Ride Status</li>
                  <li>Picked Up At</li>
                  <li>Completed At</li>
                  <li>Driver Rating</li>
                  <li>Rider Feedback</li>
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
                  {rideDetails?.rideAcceptedAt ? (
                    <li>
                      {new Date(rideDetails?.rideAcceptedAt).toLocaleString()}
                    </li>
                  ) : (
                    ""
                  )}
                  <li>{rideDetails?.rideProgressStatus}</li>
                  {rideDetails?.ridePickedUpAt ? (
                    <li>
                      {new Date(rideDetails?.ridePickedUpAt).toLocaleString()}
                    </li>
                  ) : (
                    ""
                  )}
                  {rideDetails?.rideCompletedAt ? (
                    <li>
                      {new Date(rideDetails?.rideCompletedAt).toLocaleString()}
                    </li>
                  ) : (
                    ""
                  )}
                  <li>{rideDetails?.driverRating}</li>
                  <li>{rideDetails?.riderFeedback}</li>
                </ul>
              </div>
            </div>
          )}
          <Separator className="my-8"></Separator>
          {/* driver info */}
          <div className="grid grid-cols-2">
            {/* driver info */}
            {driverInfo && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Driver Information</h3>
                <div className="flex gap-6">
                  <ul className="text-pretty space-y-2">
                    <li>Full Name</li>
                    <li>Address</li>
                    <li>Date of Birth</li>
                    <li>Gender</li>
                  </ul>
                  <ul className="text-pretty space-y-2">
                    <li>:</li>
                    <li>:</li>
                    <li>:</li>
                    <li>:</li>
                  </ul>
                  <ul className="text-muted-foreground space-y-2">
                    <li>{driverInfo?.name}</li>
                    <li>{driverInfo?.address}</li>
                    <li>{driverInfo?.dateOfBirth}</li>
                    <li>{driverInfo?.gender}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* vehicle info */}
            {vehicleInfo && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Vehicle Information</h3>
                <div className="flex gap-6">
                  <ul className="text-pretty space-y-2">
                    <li>Brand</li>
                    <li>Model</li>
                    <li>License Plate</li>
                    <li>Color</li>
                    <li>Manufacturing Year</li>
                  </ul>
                  <ul className="text-pretty space-y-2">
                    <li>:</li>
                    <li>:</li>
                    <li>:</li>
                    <li>:</li>
                    <li>:</li>
                  </ul>
                  <ul className="text-muted-foreground space-y-2">
                    <li>{vehicleInfo?.brand}</li>
                    <li>{vehicleInfo?.model}</li>
                    <li>{vehicleInfo?.licensePlate}</li>
                    <li>{vehicleInfo?.color}</li>
                    <li>{vehicleInfo?.manufacturingYear}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
