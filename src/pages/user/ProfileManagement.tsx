import ChangePasswordModal from "@/components/modal/ChangePasswordModal";
import EditProfileModal from "@/components/modal/EditProfileModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";

export default function ProfileManagement() {
  const { data, isLoading } = useGetOwnInfoQuery(undefined);
  if (isLoading) return <p>Loading...</p>;
  console.log(data?.data);

  const userData = data?.data;
  return (
    <div className="py-4 px-8">
      <div className="grid grid-cols-2 items-center">
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
            <li>{userData?.name}</li>
            <li>{userData?.email}</li>
            <li>{userData?.phone}</li>
          </ul>
        </div>
        {/* profile photo */}
        <div>
          {userData?.picture ? (
            <Avatar className="h-48 w-48 border-4">
              <AvatarImage src={userData?.picture} alt="Profile image" />
            </Avatar>
          ) : (
            <Avatar className="h-48 w-48">
              {userData?.name && (
                <AvatarFallback className="text-primary w-full h-full">
                  {userData?.name[0]}
                </AvatarFallback>
              )}
            </Avatar>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 mt-20">
        <div className="flex gap-6">
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
            <li>{userData?.address}</li>
            <li>{userData?.dateOfBirth}</li>
            <li>{userData?.gender}</li>
          </ul>
        </div>
        <div className="flex gap-6">
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
        </div>
        <div className="flex gap-4 justify-end items-end">
          <ChangePasswordModal></ChangePasswordModal>
          <EditProfileModal userData={userData}></EditProfileModal>
        </div>
      </div>
    </div>
  );
}
