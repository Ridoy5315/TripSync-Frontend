import { LogOutIcon, Settings2, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/redux/hook";
import { Link, useNavigate } from "react-router-dom";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";
import { useSignOutMutation } from "@/redux/features/auth/auth.api";
import { handleSignOut } from "@/utils/signOut";

export default function NavbarProfile() {
  const { data } = useGetOwnInfoQuery(undefined);
  const [signOut] = useSignOutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profileData = data?.data?.user;

  const rolePaths: Record<string, string> = {
    SUPER_ADMIN: "/admin/user/user/profile",
    ADMIN: "/admin/user/user/profile",
    DRIVER: "/driver/user/user/profile",
    USER: "/user/profile",
  };

  const profilePath = rolePaths[profileData?.role] || "/unauthorized";

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
              <AvatarFallback className="text-primary w-full h-full">
                {profileData?.name[0]}
              </AvatarFallback>
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
            <Link className=" w-full" to={profilePath}>
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Settings2
                size={16}
                className="opacity-60 mr-2"
                aria-hidden="true"
              />
              Settings
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Link className=" w-full" to={profilePath}>
                    Edit profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className=" w-full" to="/signUp">
                    Create another profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link className=" w-full" to="/create-emergency-contact">
                    Safety
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {/* <DropdownMenuItem>
            <Settings2 className="opacity-60" aria-hidden="true" />
            <Link className=" w-full" to="/settings">
              Settings
            </Link>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <Button
            className="px-0 py-3 h-0 cursor-pointer w-full justify-start"
            variant="ghost"
            onClick={() => handleSignOut(signOut, dispatch, navigate)}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
