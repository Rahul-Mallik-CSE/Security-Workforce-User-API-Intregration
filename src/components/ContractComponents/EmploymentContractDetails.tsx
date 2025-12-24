/** @format */

import React from "react";

interface EmploymentContractDetailsProps {
  name: string;
  dob: string;
  address: string;
  postcode: string;
  nationality: string;
  licenseExpiry: string;
  licenseNumber: string;
  sharingCode: string;
  insuranceProvidedBy: string;
  accountName: string;
  sortCode: string;
  accountNumber: string;
}

const EmploymentContractDetails: React.FC<EmploymentContractDetailsProps> = ({
  name,
  dob,
  address,
  postcode,
  nationality,
  licenseExpiry,
  licenseNumber,
  sharingCode,
  insuranceProvidedBy,
  accountName,
  sortCode,
  accountNumber,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Employment / Engagement Contract
        </h2>
        <button className="px-4 py-1.5 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors">
          Download
        </button>
      </div>

      <p className="text-xs text-gray-600 mb-6">
        Get a professional & encouraging platform To test the services of
        digital ID or to enroll in this program (if you already have a digital
        ID or you wish to register with Security Guard 1).
      </p>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <p className="text-sm text-gray-900">{name}</p>
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              DOB
            </label>
            <p className="text-sm text-gray-900">{dob}</p>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <p className="text-sm text-gray-900">{address}</p>
          </div>

          {/* Postcode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postcode
            </label>
            <p className="text-sm text-gray-900">{postcode}</p>
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nationality
            </label>
            <p className="text-sm text-gray-900">{nationality}</p>
          </div>

          {/* License Expiry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Licence Expiry
            </label>
            <p className="text-sm text-gray-900">{licenseExpiry}</p>
          </div>

          {/* License Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Licence Number
            </label>
            <p className="text-sm text-gray-900">{licenseNumber}</p>
          </div>

          {/* Sharing Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sharing Code
            </label>
            <p className="text-sm text-gray-900">{sharingCode}</p>
          </div>

          {/* Insurance Provided By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Insurance Provided By
            </label>
            <p className="text-sm text-gray-900">{insuranceProvidedBy}</p>
          </div>

          {/* Account Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Name
            </label>
            <p className="text-sm text-gray-900">{accountName}</p>
          </div>

          {/* Sort Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Code
            </label>
            <p className="text-sm text-gray-900">{sortCode}</p>
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number
            </label>
            <p className="text-sm text-gray-900">{accountNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploymentContractDetails;
