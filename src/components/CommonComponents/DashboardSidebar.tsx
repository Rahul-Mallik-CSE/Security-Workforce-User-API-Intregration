/** @format */

"use client";

import type React from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import {
  IoDocumentTextOutline,
  IoChatbubblesOutline,
  IoGridOutline,
} from "react-icons/io5";
import { RiBriefcaseLine, RiMapPinLine } from "react-icons/ri";

import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BiSupport, BiUserPlus } from "react-icons/bi";
import { FaShieldAlt, FaUserAlt } from "react-icons/fa";
import LogoutModal from "./LogOutModal";

// import { logout } from "@/service/authService";
export default function DashboardSidebar() {
  return <DashboardSidebarContent />;
}

function DashboardSidebarContent() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();

  const handleLogout = async () => {
    // Perform logout actions here (clear tokens, etc.)
    // Redirect to login page
    // await logout();
    // localStorage.removeItem("accessToken");
    router.push("/sign-in");
    setIsLogoutModalOpen(false);
  };

  if (
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/forget-pass" ||
    pathname === "/verify-method" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-pass"
  ) {
    return null;
  }

  const isCollapsed = state === "collapsed";

  const navItems = [
    { href: "/", label: "Dashboard", icon: IoGridOutline },
    { href: "/job-management", label: "Job Management", icon: RiBriefcaseLine },
    {
      href: "/preferred-operatives",
      label: "Preferred Operatives",
      icon: FaShieldAlt,
    },
    { href: "/contracts", label: "Contracts", icon: IoDocumentTextOutline },
    { href: "/chat", label: "Chat", icon: IoChatbubblesOutline },
    {
      href: "/operatives-tracker",
      label: "Operatives Tracker",
      icon: RiMapPinLine,
    },
    { href: "/payroll", label: "Payroll", icon: AiOutlineDollarCircle },
    { href: "/settings", label: "Settings", icon: FiSettings },
    { href: "/support", label: "Support", icon: BiSupport },
    { href: "/my-referral-user", label: "My Referral User", icon: BiUserPlus },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <SidebarTrigger />
      </div>
      <Sidebar className="border-r-0  " collapsible="icon">
        <SidebarContent className="bg-white">
          <div
            className={`flex items-center justify-center  px-0 md:px-4 py-4 relative ${
              isCollapsed ? "px-2" : "gap-2"
            }`}
          >
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="rounded-xl object-contain"
                />
              </Link>
            </div>

            {/* Collapse button for desktop */}
            <div className={`absolute top-1 hidden md:block right-0`}>
              <SidebarTrigger />
            </div>
          </div>

          <SidebarMenu
            className={
              isCollapsed ? "px-2 space-y-2 items-center" : "md:px-6 space-y-3"
            }
          >
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={
                  pathname === item.href || pathname.startsWith(item.href + "/")
                }
                collapsed={isCollapsed}
              />
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className={`bg-white  ${isCollapsed ? "px-2" : "px-6"}`}>
          <div className={`${isCollapsed ? "w-full" : "w-full"} py-4`}>
            {!isCollapsed ? (
              <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-4">
                <Image
                  src="/logo.png"
                  alt="profile"
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-semibold">Jhon Marcel</p>
                      <p className="text-sm text-gray-400">Premium</p>
                    </div>
                    <div className="text-gray-500">▾</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-2">
                <div className="rounded-full p-1 bg-blue-100">
                  <FaUserAlt className="h-4 w-4" />
                </div>
              </div>
            )}

            <div className="mt-4">
              <button className="w-full bg-white border border-blue-100 rounded-lg py-3 flex items-center justify-center gap-3 text-blue-800 font-medium">
                <span className="text-xl">👑</span>
                {!isCollapsed && <span>Upgrade Plan</span>}
              </button>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

// ...existing code...

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed?: boolean;
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed = false,
}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          active
            ? "bg-orange-500 text-white hover:text-white hover:bg-orange-500 focus:bg-orange-600 font-medium"
            : "bg-transparent text-gray-700 hover:bg-orange-50 hover:text-orange-500 font-medium"
        )}
      >
        <Link
          href={href}
          className={cn(
            collapsed
              ? "flex items-center justify-center px-2 py-3 transition-colors rounded-full w-12 h-12 mx-auto"
              : "flex items-center gap-3 px-4 py-3 transition-colors rounded-md"
          )}
        >
          <Icon size={collapsed ? 20 : 18} />
          {!collapsed && <span className="text-sm">{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
// ...existing code...
