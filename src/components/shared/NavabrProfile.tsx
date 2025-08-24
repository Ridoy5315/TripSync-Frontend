import { LogOutIcon, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/redux/hook";
import { Link } from "react-router";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";
import { authApi, useSignOutMutation } from "@/redux/features/auth/auth.api";

export default function NavbarProfile() {
  const { data } = useGetOwnInfoQuery(undefined);
  const [signOut] = useSignOutMutation();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    await signOut(undefined);
    dispatch(authApi.util.resetApiState());
  };

  console.log(data);

  const profileData = data?.data;
  console.log(profileData);
  console.log(profileData?.name[0]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-0 hover:bg-transparent cursor-pointer"
        >
          {profileData?.picture ? (
            <Avatar className="h-10 w-10">
              <AvatarImage src={profileData.picture} alt="Profile image" />
            </Avatar>
          ) : (
            <Avatar className="h-10 w-10">
              <AvatarFallback className="text-primary w-full h-full">{profileData?.name[0]}</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {profileData?.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {profileData?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserRound className="opacity-60" aria-hidden="true" />
            <Link className=" w-full" to="/user/me">
              My Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <Button
            className="px-0 py-3 h-0 cursor-pointer w-full justify-start"
            variant="ghost"
            onClick={handleSignOut}
          >
            Logout
          </Button>
          {/* <span>Logout</span> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
