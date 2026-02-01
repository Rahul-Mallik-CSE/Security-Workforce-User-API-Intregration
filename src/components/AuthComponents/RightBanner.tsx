/** @format */

import React from "react";
import Image from "next/image";

const RightBanner = () => {
  return (
    <div className="relative w-full h-full bg-orange-400 flex flex-col items-center justify-center p-12">
      {/* Header Text */}
  
        
  

      {/* Logo Container */}
      <div className="flex items-center flex-col justify-center gap-4">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2 text-center">Securiverse</h2>
          <p className="text-[18px] text-white/90 tracking-[5px]">Opportunity. On demand</p>
        </div>
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
