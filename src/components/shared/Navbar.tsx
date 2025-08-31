import { BookOpenIcon, InfoIcon, LifeBuoyIcon } from "lucide-react";

import Logo from "@/assets/companyLogo/company_logo.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./mode-toggle";
import { role } from "@/constants/role";
import { Link } from "react-router-dom";
import { useGetOwnInfoQuery } from "@/redux/features/user/user.api";
import NavbarProfile from "./NavabrProfile";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  {
    label: "About Us",
    submenu: true,
    type: "icon",
    role: "PUBLIC",
    items: [
      { href: "#", label: "Company background", icon: "BookOpenIcon" },
      { href: "#", label: "Mission", icon: "LifeBuoyIcon" },
      { href: "#", label: "Team profiles", icon: "InfoIcon" },
    ],
  },
  { href: "/admin", label: "Features", role: role.superAdmin },
  { href: "/admin", label: "Features", role: role.admin },
  { href: "/user/ride/ride-request", label: "Features", role: role.user },
  { href: "/driver", label: "Features", role: role.driver },
];

export default function Navbar() {
  const { data } = useGetOwnInfoQuery(undefined);

  console.log(data)

  return (
    <div className="border-b sticky top-0 z-10 shadow">
      <header className=" px-4 lg:px-0 container mx-auto">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-64 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        {link.submenu ? (
                          <>
                            <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                              {link.label}
                            </div>
                            <ul>
                              {link.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <NavigationMenuLink
                                    href={item.href}
                                    className="py-1.5"
                                  >
                                    {item.label}
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <NavigationMenuLink
                            href={link.href}
                            className="py-1.5"
                          >
                            {link.label}
                          </NavigationMenuLink>
                        )}
                        {/* Add separator between different types of items */}
                        {index < navigationLinks.length - 1 &&
                          // Show separator if:
                          // 1. One is submenu and one is simple link OR
                          // 2. Both are submenus but with different types
                          ((!link.submenu &&
                            navigationLinks[index + 1].submenu) ||
                            (link.submenu &&
                              !navigationLinks[index + 1].submenu) ||
                            (link.submenu &&
                              navigationLinks[index + 1].submenu &&
                              link.type !==
                                navigationLinks[index + 1].type)) && (
                            <div
                              role="separator"
                              aria-orientation="horizontal"
                              className="bg-border -mx-1 my-1 h-px w-full"
                            />
                          )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <img className="h-10" src={Logo} alt="" />
                <p className="text-2xl">
                  <span>Trip</span>Sync
                </p>
              </div>
              {/* Navigation menu */}
              <NavigationMenu viewport={false} className="max-md:hidden">
                <NavigationMenuList className="gap-2">
                  {navigationLinks
                    .filter(
                      (link) =>
                        link.role === "PUBLIC" || link.role === data?.data?.user?.role
                    )
                    .map((link, index) => (
                      <NavigationMenuItem key={index}>
                        {link.submenu ? (
                          <>
                            <NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5">
                              {link.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="...">
                              <ul
                                className={cn(
                                  link.type === "description"
                                    ? "min-w-64"
                                    : "min-w-48"
                                )}
                              >
                                {link.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <NavigationMenuLink
                                      href={item.href}
                                      className="py-1.5"
                                    >
                                      {link.type === "icon" &&
                                        "icon" in item && (
                                          <div className="flex items-center gap-2">
                                            {item.icon === "BookOpenIcon" && (
                                              <BookOpenIcon
                                                size={16}
                                                className="..."
                                              />
                                            )}
                                            {item.icon === "LifeBuoyIcon" && (
                                              <LifeBuoyIcon
                                                size={16}
                                                className="..."
                                              />
                                            )}
                                            {item.icon === "InfoIcon" && (
                                              <InfoIcon
                                                size={16}
                                                className="..."
                                              />
                                            )}
                                            <span>{item.label}</span>
                                          </div>
                                        )}
                                      {link.type === "description" &&
                                      "description" in item ? (
                                        <div className="space-y-1">
                                          <div className="font-medium">
                                            {item.label}
                                          </div>
                                          <p className="text-muted-foreground line-clamp-2 text-xs">
                                            {item.description}
                                          </p>
                                        </div>
                                      ) : (
                                        (!link.type ||
                                          (link.type !== "icon" &&
                                            link.type !== "description")) && (
                                          <span>{item.label}</span>
                                        )
                                      )}
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink
                            href={link.href}
                            className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                          >
                            {link.label}
                          </NavigationMenuLink>
                        )}
                      </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-2">
            <ModeToggle></ModeToggle>
            <div className="w-px h-8 bg-border"></div>
            {data?.data?.user?.email ? (
              <NavbarProfile></NavbarProfile>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="text-sm">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="text-sm">
                  <Link to="/signUp">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
          {/* <div className="flex items-center gap-2">
            <ModeToggle></ModeToggle>
            <div className="w-px h-8 bg-border"></div>
          <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="text-sm">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/signUp">Get Started</Link>
              </Button>
            </div>
          </div> */}
        </div>
      </header>
    </div>
  );
}
