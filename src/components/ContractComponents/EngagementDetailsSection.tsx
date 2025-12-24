/** @format */

import React from "react";

interface EngagementDetailsSectionProps {
  roleType: string;
  startDate: string;
  companyName: string;
  branch: string;
  duration: string;
}

const EngagementDetailsSection: React.FC<EngagementDetailsSectionProps> = ({
  roleType,
  startDate,
  companyName,
  branch,
  duration,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-6">Engagement Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Role Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role Type
          </label>
          <p className="text-sm text-gray-900">{roleType}</p>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <p className="text-sm text-gray-900">{startDate}</p>
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <p className="text-sm text-gray-900">{companyName}</p>
        </div>

        {/* Branch */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Branch
          </label>
          <p className="text-sm text-gray-900">{branch}</p>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (hours)
          </label>
          <p className="text-sm text-gray-900">{duration}</p>
        </div>
      </div>
    </div>
  );
};

export default EngagementDetailsSection;
