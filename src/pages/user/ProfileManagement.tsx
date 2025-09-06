import ChangePasswordModal from "@/components/modal/ChangePasswordModal";
import EditProfileModal from "@/components/modal/EditProfileModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";

export default function ProfileManagement() {
  const { data, isLoading } = useGetOwnInfoQuery(undefined);

  console.log(data?.data?.user);

  const userData = data?.data?.user;
  const driverInfo = data?.data?.driverInfo;
  const vehicleInfo = data?.data?.vehicleInfo;
  console.log(userData?.role);
  return (
    <div className="py-4 px-8">
      <div className="grid grid-cols-2 items-center">
        {isLoading && (
          <>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="w-[300px] h-[28px]" />
              ))}
            </div>
            {/* profile photo */}
            <div>
              <Skeleton className="w-48 h-48 rounded-full" />
            </div>
          </>
        )}
        {!isLoading && (
          <>
            <div className="flex gap-6">
              <ul className="text-pretty font-semibold space-y-2 text-xl">
                <li>Full Name</li>
                <li>Email</li>
                <li>Phone</li>
              </ul>
              <ul className="text-pretty space-y-2 text-xl">
                <li>:</li>
                <li>:</li>
                <li>:</li>
              </ul>
              <ul className="text-muted-foreground space-y-2 text-xl">
                <li>{userData?.name ? userData?.name : "N/A"}</li>
                <li>{userData?.email ? userData?.email : "N/A"}</li>
                <li>{userData?.phone ? userData?.phone : "N/A"}</li>
              </ul>
            </div>
            {/* profile photo */}
            <div>
              {userData?.picture ? (
                <Avatar className="h-48 w-48 border-4">
                  <AvatarImage
                    className="object-cover object-center"
                    src={userData?.picture}
                    alt="Profile image"
                  />
                </Avatar>
              ) : (
                <Avatar className="h-48 w-48 ">
                  {userData?.name && (
                    <AvatarFallback className="text-primary w-full h-full ">
                      {userData?.name[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
              )}
            </div>
          </>
        )}
      </div>
      <div className="grid grid-cols-3 mt-20">
        <div className="flex gap-6">
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="w-[300px] h-[28px]" />
              ))}
            </div>
          )}
          {!isLoading && (
            <>
              <ul className="text-pretty space-y-2">
                <li>Address</li>
                <li>Birth Date</li>
                <li>Gender</li>
              </ul>
              <ul className="text-pretty space-y-2">
                <li>:</li>
                <li>:</li>
                <li>:</li>
              </ul>
              <ul className="text-muted-foreground space-y-2">
                <li>{userData?.address ? userData?.address : "N/A"}</li>
                <li>{userData?.dateOfBirth ? userData?.dateOfBirth : "N/A"}</li>
                <li>{userData?.gender ? userData?.gender : "N/A"}</li>
              </ul>
            </>
          )}
        </div>
        <div className="flex gap-6">
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="w-[300px] h-[28px]" />
              ))}
            </div>
          )}
          {!isLoading && (
            <>
              <ul className="text-pretty space-y-2">
                <li>Cancel Limit (Monthly)</li>
                <li>Trip Status</li>
                <li>Account</li>
              </ul>
              <ul className="text-pretty space-y-2">
                <li>:</li>
                <li>:</li>
                <li>:</li>
              </ul>
              <ul className="text-muted-foreground space-y-2">
                <li>{userData?.monthlyCancelLimit ?? "N/A"}</li>
                <li>{userData?.isOnTrip ? "On a Trip" : "Idle"}</li>
                <li>{userData?.isVerified ? "Verified" : "Not Verified"}</li>
              </ul>
            </>
          )}
        </div>
        {(userData?.role === "USER" ||
          userData?.role === "ADMIN" ||
          userData?.role === "SUPER_ADMIN") && (
          <div className="flex gap-4 justify-end items-end">
            <ChangePasswordModal></ChangePasswordModal>
            <EditProfileModal userData={userData}></EditProfileModal>
          </div>
        )}
      </div>
      {userData?.role === "DRIVER" && (
        <div className="">
          <div className="grid grid-cols-3 mt-10">
            {!isLoading && (
              <>
                <div className="flex gap-6">
                  <ul className="text-pretty space-y-2">
                    <li>Approval Status</li>
                    <li>Availability</li>
                  </ul>
                  <ul className="text-pretty space-y-2">
                    <li>:</li>
                    <li>:</li>
                  </ul>
                  <ul className="text-muted-foreground space-y-2">
                    <li>{driverInfo?.approvalStatus ? "Authorized" : "N/A"}</li>
                    <li>
                      {driverInfo?.availabilityStatus
                        ? driverInfo?.availabilityStatus === "ONLINE"
                          ? "Online"
                          : driverInfo?.availabilityStatus === "OFFLINE"
                          ? "Offline"
                          : "On Trip"
                        : "N/A"}
                    </li>
                  </ul>
                </div>
                <div className="flex gap-6">
                  <ul className="text-pretty space-y-2">
                    <li>Rating</li>
                    <li>Total Earnings</li>
                  </ul>
                  <ul className="text-pretty space-y-2">
                    <li>:</li>
                    <li>:</li>
                  </ul>
                  <ul className="text-muted-foreground space-y-2">
                    <li>
                      {driverInfo?.rating
                        ? `${driverInfo?.rating} (Out of 5)`
                        : "N/A"}
                    </li>
                    <li>
                      {driverInfo?.totalIncome
                        ? `${driverInfo?.totalIncome}$`
                        : "0$"}
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <div className="mt-10">
            {!isLoading && (
              <>
                <h3 className="font-semibold text-lg mb-2">Vehicle Info</h3>
                <div className="grid grid-cols-3">
                  <div className="flex gap-6">
                    <ul className="text-pretty space-y-2">
                      <li>brand</li>
                      <li>model</li>
                      <li>color</li>
                    </ul>
                    <ul className="text-pretty space-y-2">
                      <li>:</li>
                      <li>:</li>
                      <li>:</li>
                    </ul>
                    <ul className="text-muted-foreground space-y-2">
                      <li>{vehicleInfo?.brand ? vehicleInfo?.brand : "N/A"}</li>
                      <li>
                        {vehicleInfo?.model ? vehicleInfo?.model : "N/A"}{" "}
                      </li>
                      <li>
                        {vehicleInfo?.color ? vehicleInfo?.color : "N/A"}{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-6">
                    <ul className="text-pretty space-y-2">
                      <li>licensePlate</li>
                      <li>manufacturingYear</li>
                    </ul>
                    <ul className="text-pretty space-y-2">
                      <li>:</li>
                      <li>:</li>
                    </ul>
                    <ul className="text-muted-foreground space-y-2">
                      <li>
                        {vehicleInfo?.licensePlate
                          ? vehicleInfo?.licensePlate
                          : "N/A"}
                      </li>
                      <li>
                        {vehicleInfo?.manufacturingYear
                          ? vehicleInfo?.manufacturingYear
                          : "N/A"}
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-4 justify-end items-end">
            <ChangePasswordModal></ChangePasswordModal>
            <EditProfileModal userData={userData}></EditProfileModal>
          </div>
        </div>
      )}
    </div>
  );
}
