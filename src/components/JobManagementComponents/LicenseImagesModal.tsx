/** @format */

"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getFullImageFullUrl } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LicenseImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  licenseImages: string[];
  operativeName: string;
}

const LicenseImagesModal = ({
  isOpen,
  onClose,
  licenseImages,
  operativeName,
}: LicenseImagesModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? licenseImages.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === licenseImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl">
            {operativeName} - License Images
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {licenseImages.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">No license images available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Main Image Display with Navigation */}
              <div className="relative">
                <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={getFullImageFullUrl(licenseImages[currentImageIndex])}
                    alt={`License image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                {/* Navigation Arrows */}
                {licenseImages.length > 1 && (
                  <>
                    <Button
                      onClick={handlePrevious}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 h-auto bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg transition-all"
                      aria-label="Previous image"
                      variant="ghost"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 h-auto bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg transition-all"
                      aria-label="Next image"
                      variant="ghost"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black bg-opacity-60 text-white text-sm rounded-full">
                  {currentImageIndex + 1} / {licenseImages.length}
                </div>
              </div>

              {/* Thumbnail Grid */}
              {licenseImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {licenseImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={getFullImageFullUrl(image)}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LicenseImagesModal;
