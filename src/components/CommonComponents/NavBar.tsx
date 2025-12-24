/** @format */

"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import LogoutModal from "./LogOutModal";

const NavBar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <>
      <div className="sticky top-0 z-40 w-full h-16 bg-white flex items-center px-4 md:px-8 shadow-md border border-transparent">
        <div className="w-full flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Welcome Back, <span className="text-orange-500">Jhon</span>
            </h1>
          </div>

          {/* right side of navbar */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6 text-gray-700" />
            </button>

            <button
              className="flex items-center gap-3 bg-transparent rounded-md p-1 hover:bg-gray-50 transition-colors"
              aria-label="Profile"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <Image
                src="/logo.png"
                alt="profile"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
              <span className="text-base md:text-lg text-gray-800 font-medium">
                Jhon Marcel
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default NavBar;
