/** @format */

"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useProfileDetailsQuery } from "@/redux/freatures/settingAPI";
import { getFullImageFullUrl } from "@/lib/utils";

const NavBar = () => {
  const pathname = usePathname();
  const { data: profileData } = useProfileDetailsQuery();

  const userData = profileData?.data;
  const userName = userData?.first_name || "User";
  const userImage = userData?.image
    ? getFullImageFullUrl(userData.image)
    : "/logo.png";
  const firstName = userName.split(" ")[0];

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
              Welcome Back, <span className="text-orange-500">{firstName}</span>
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
            >
              <Image
                src={userImage}
                alt="profile"
                width={36}
                height={36}
                className="rounded-full object-cover"
                unoptimized
              />
              <span className="text-base md:text-lg text-gray-800 font-medium truncate max-w-[150px]">
                {userName}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
