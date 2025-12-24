/** @format */

import React from "react";
import Image from "next/image";

const RightBanner = () => {
  return (
    <div className="relative w-full h-full bg-orange-400 flex flex-col items-center justify-center p-12">
      {/* Header Text */}
      <div className="absolute top-8 left-8">
        <h2 className="text-3xl font-bold text-white mb-2">Securiverse</h2>
        <p className="text-sm text-white/90">Opportunity. On demand</p>
      </div>

      {/* Logo Container */}
      <div className="flex items-center justify-center">
        <div className="">
          <Image
            src="/logo.png"
            alt="Securiverse Logo"
            width={280}
            height={280}
            className="object-contain rounded-4xl"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default RightBanner;
