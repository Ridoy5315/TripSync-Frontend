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
import { Skeleton } from "../ui/skeleton";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/admin", label: "Features", role: role.superAdmin },
  { href: "/admin", label: "Features", role: role.admin },
  { href: "/user/ride/ride-request", label: "Features", role: role.user },
  { href: "/driver", label: "Features", role: role.driver },
  { href: "/user/ride/ride-request", label: "Ride Now", role: role.user },
  {
    href: "/driver/user/user/ride/ride-request",
    label: "Ride Now",
    role: role.driver,
  },
  {
    href: "/admin/user/user/ride/ride-request",
    label: "Ride Now",
    role: role.admin,
  },
  {
    href: "/admin/user/user/ride/ride-request",
    label: "Ride Now",
    role: role.superAdmin,
  },
  { href: "/join-driver", label: "Join as Driver", role: role.user },
  { href: "/fare-details", label: "Fare Details", role: "PUBLIC" },
  {
    label: "About Us",
    submenu: true,
    type: "icon",
    role: "PUBLIC",
    items: [
      {
        href: "/aboutUs/company-background",
        label: "Company background",
      },
      { href: "/aboutUs/mission", label: "Mission" },
      {
        href: "/aboutUs/team-profiles",
        label: "Team profiles",
      },
    ],
  },
  {
    label: "Support",
    submenu: true,
    type: "icon",
    role: "PUBLIC",
    items: [
      { href: "/support/contactUs", label: "Get in Touch" },
      { href: "/support/faq", label: "FAQs" },
    ],
  },
];

export default function Navbar() {
  const { data, isLoading } = useGetOwnInfoQuery(undefined);

  console.log(data);

  return (
    <div className="border-b bg-background sticky top-0 z-10 shadow">
      <header className=" px-4 lg:px-0 container mx-auto">
        <div className="flex lg:my-1 md:my-1 h-16 items-center justify-between gap-4">
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
              <PopoverContent align="start" className="w-48 p-1">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks
                      .filter(
                        (link) =>
                          link.role === "PUBLIC" ||
                          link.role === data?.data?.user?.role
                      )
                      .map((link, index) => (
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
            <div className="flex items-center lg:gap-6 md:gap-4">
              <div className="flex items-center lg:gap-2 gap-1">
                <img className="lg:h-10 h-8" src={Logo} alt="" />
                <p className="lg:text-2xl text-xl">
                  <span>Trip</span>Sync
                </p>
              </div>
              {/* Navigation menu */}
              <NavigationMenu viewport={false} className="max-md:hidden">
                <NavigationMenuList className="lg:gap-2 gap-0.5 ">
                  {navigationLinks
                    .filter(
                      (link) =>
                        link.role === "PUBLIC" ||
                        link.role === data?.data?.user?.role
                    )
                    .map((link, index) => (
                      <NavigationMenuItem key={index}>
                        {link.submenu ? (
                          <>
                            <NavigationMenuTrigger className="lg:text-sm text-xs px-1 text-muted-foreground hover:text-primary bg-transparent lg:px-2 lg:py-1.5 py-1 font-medium *:[svg]:-me-0.5 *:[svg]:size-3">
                              {link.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="...">
                              <ul
                                className={cn(
                                  link.type === "description"
                                    ? "min-w-40"
                                    : "min-w-48"
                                )}
                              >
                                {link.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <NavigationMenuLink
                                      href={item.href}
                                      className="lg:text-sm text-xs lg:py-1.5 py-1 text-muted-foreground hover:text-primary"
                                    >
                                      <span>{item.label}</span>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink
                            href={link.href}
                            className="lg:text-sm lg:px-2 px-1 text-xs text-muted-foreground hover:text-primary lg:py-1.5 py-1 font-medium"
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
            {isLoading ? (
              // Show a loading placeholder/spinner instead of Sign In buttons
              <div className="">
                <Skeleton className="w-[100px] h-[32px]" />
              </div>
            ) : data?.data?.user?.email ? (
              <NavbarProfile />
            ) : (
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="lg:text-sm md:text-sm text-xs"
                >
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="lg:text-sm md:text-sm text-xs"
                >
                  <Link to="/signUp">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
