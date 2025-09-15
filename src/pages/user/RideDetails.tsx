
import FeedbackModal from "@/components/modal/FeedbackModal";
import SOSButtonModal from "@/components/modal/SOSButtonModal";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRideDetailsQuery } from "@/redux/features/ride/ride.api";
// import moment from "moment";

export default function RideDetails() {
  const { data, isLoading } = useRideDetailsQuery(undefined);

  const rideDetails = data?.data?.rideDetails;
  const driverInfo = data?.data?.driverInfo;
  const vehicleInfo = data?.data?.vehicleInfo;

  return (
    <div className="py-4 lg:px-8 px-4">
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
          <div className="flex justify-between items-center">
            {rideDetails?.rideProgressStatus === "COMPLETED" ||
            rideDetails?.rideRequestAction === "CANCELED" ||
            rideDetails?.rideRequestAction === "REJECTED" ? (
              <h3 className="text-primary font-semibold lg:text-2xl text-xl">
                Your last ride details
              </h3>
            ) : (
              <h3 className="text-primary font-semibold lg:text-2xl text-xl">
                Your current ride details :
              </h3>
            )}
            {(rideDetails?.rideRequestAction === "ACCEPTED" &&
              rideDetails?.rideProgressStatus === "COMPLETED") &&
             (rideDetails?.driverRating == null && !rideDetails?.riderFeedback?.trim()) && (
                <FeedbackModal rideId= {rideDetails?._id}></FeedbackModal>
              )}

            {rideDetails?.rideProgressStatus !== "COMPLETED" &&
              rideDetails?.rideRequestAction === "ACCEPTED" && (
                <SOSButtonModal></SOSButtonModal>
              )}
          </div>
          <Separator className="lg:my-4 my-3"></Separator>
          {/* ride details */}
          {rideDetails && (
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-2">
              <div className="flex gap-6 text-sm lg:text-base">
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
                  <li>{rideDetails.rideRequestAction ?? "N/A"}</li>
                  <li>
                    {new Date(rideDetails.rideRequestAt).toLocaleString() ??
                      "N/A"}
                  </li>
                  <li>{rideDetails.originalFare} $</li>
                </ul>
              </div>
              <div className="flex lg:gap-6 gap-14 text-sm lg:text-base">
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
                  <li>
                    {new Date(rideDetails?.rideAcceptedAt).toLocaleString() ??
                      "N/A"}
                  </li>

                  <li>{rideDetails?.rideProgressStatus ?? "N/A"}</li>

                  <li>
                    {rideDetails?.ridePickedUpAt &&
                    !isNaN(new Date(rideDetails.ridePickedUpAt).getTime())
                      ? new Date(rideDetails.ridePickedUpAt).toLocaleString()
                      : "N/A"}
                  </li>
                  <li>
                    {rideDetails?.rideCompletedAt &&
                    !isNaN(new Date(rideDetails.rideCompletedAt).getTime())
                      ? new Date(rideDetails.rideCompletedAt).toLocaleString()
                      : "N/A"}
                  </li>

                  <li>{rideDetails?.driverRating ?? "N/A"}</li>
                  <li>{rideDetails?.riderFeedback ?? "N/A"}</li>
                </ul>
              </div>
            </div>
          )}
          <Separator className="lg:my-8 my-4"></Separator>
          {/* driver info */}
          <div className="grid grid-cols-2">
            {/* driver info */}
            {driverInfo && (
              <div className="space-y-3">
                <h3 className="lg:text-xl text-lg font-semibold">
                  Driver Information
                </h3>
                <div className="flex lg:gap-6 gap-2 text-sm lg:text-base">
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
                    <li>{driverInfo?.address ?? "N/A"}</li>
                    <li>{driverInfo?.dateOfBirth ?? "N/A"}</li>
                    <li>{driverInfo?.gender ?? "N/A"}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* vehicle info */}
            {vehicleInfo && (
              <div className="space-y-3">
                <h3 className="lg:text-xl text-lg font-semibold">
                  Vehicle Information
                </h3>
                <div className="flex lg:gap-6 gap-2 text-sm lg:text-base">
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
