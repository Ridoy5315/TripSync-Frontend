"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSignOutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";

import { Button } from "./ui/button";
import { handleSignOut } from "@/utils/signOut";
import { useNavigate } from "react-router-dom";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  const [signOut] = useSignOutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-10 w-10 rounded-full">
                <div>
                  {user?.avatar ? (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} alt="Profile image" />
                    </Avatar>
                  ) : (
                    <Avatar className="h-10 w-10">
                      {user?.name && (
                        <AvatarFallback className="text-primary w-full h-full">
                          {user?.name[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  )}
                </div>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-10 w-10 rounded-full">
                  <div>
                    {user?.avatar ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar} alt="Profile image" />
                      </Avatar>
                    ) : (
                      <Avatar className="h-10 w-10">
                        {user?.name && (
                          <AvatarFallback className="text-primary w-full h-full">
                            {user?.name[0]}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    )}
                  </div>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
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
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
