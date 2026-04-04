/** @format */

"use client";

import React from "react";
import { LicenceInfo, AccreditationInfo } from "@/types/AllTypes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LicenseCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  licences?: LicenceInfo[];
  accreditations?: AccreditationInfo[];
  operativeName: string;
}

const LicenseImagesModal = ({
  isOpen,
  onClose,
  licences = [],
  accreditations = [],
  operativeName,
}: LicenseCredentialsModalProps) => {
  const hasNoData = licences.length === 0 && accreditations.length === 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {operativeName} - Licenses & Accreditations
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {hasNoData ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">
                No licenses or accreditations available
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Licenses Section */}
              {licences.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Licenses
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {licences.map((licence) => (
                      <div
                        key={licence.id}
                        className="inline-flex items-center rounded-full px-3 py-2 bg-blue-100 text-blue-800 text-sm"
                      >
                        <div>
                          <div className="font-semibold">{licence.title}</div>
                          {licence.stateOrTerritory && (
                            <div className="text-xs text-blue-600">
                              {licence.stateOrTerritory}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accreditations Section */}
              {accreditations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Accreditations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {accreditations.map((accreditation) => (
                      <div
                        key={accreditation.id}
                        className="inline-flex items-center rounded-full px-3 py-2 bg-green-100 text-green-800 text-sm font-semibold"
                      >
                        {accreditation.title}
                      </div>
                    ))}
                  </div>
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
