/** @format */

import React from "react";
import { Button } from "@/components/ui/button";

interface AcceptanceSignatureProps {
  partyAEmployeeName: string;
  partyASignDate: string;
  partyBEmployerName: string;
  partyBSignDate: string;
}

const AcceptanceSignature: React.FC<AcceptanceSignatureProps> = ({
  partyAEmployeeName,
  partyASignDate,
  partyBEmployerName,
  partyBSignDate,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-6">Acceptance & Signature</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {/* Party A - Employee */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Party A — Employee
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <p className="text-sm text-blue-600">{partyAEmployeeName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sign and Date
              </label>
              <p className="text-sm text-gray-900">{partyASignDate}</p>
            </div>
          </div>
        </div>

        {/* Party B - Employer */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Party B — employer
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <p className="text-sm text-blue-600">{partyBEmployerName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sign and Date
              </label>
              <p className="text-sm text-gray-900">{partyBSignDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Line */}
      <div className="mb-6">
        <div className="border-t-2 border-gray-300 w-full"></div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          className="px-8 py-2 border-red-500 text-red-500 hover:bg-red-50"
        >
          Cancel
        </Button>
        <Button className="px-8 py-2 bg-blue-900 text-white hover:bg-blue-800">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AcceptanceSignature;
