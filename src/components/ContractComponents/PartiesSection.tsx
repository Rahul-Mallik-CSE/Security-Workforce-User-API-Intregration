/** @format */

import React from "react";

interface PartiesSectionProps {
  partyAName: string;
  partyASignature: string;
  partyADOB: string;
  partyBName: string;
  partyBDOB: string;
  partyBSignature: string;
}

const PartiesSection: React.FC<PartiesSectionProps> = ({
  partyAName,
  partyASignature,
  partyADOB,
  partyBName,
  partyBDOB,
  partyBSignature,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-6">Parties</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Party A - Employer */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Party A — Employer
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Signatures
              </label>
              <p className="text-sm text-gray-900">{partyASignature}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company (name) inc.
              </label>
              <p className="text-sm text-gray-900">{partyAName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company (Date Of Birth)
              </label>
              <p className="text-sm text-gray-900">{partyADOB}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <p className="text-sm text-gray-900">info@employer.com</p>
            </div>
          </div>
        </div>

        {/* Party B - Employee */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Party B — Employee
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Signatures
              </label>
              <p className="text-sm text-gray-900">{partyBSignature}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <p className="text-sm text-gray-900">{partyBName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Of Birth
              </label>
              <p className="text-sm text-gray-900">{partyBDOB}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <p className="text-sm text-gray-900">employee@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartiesSection;
