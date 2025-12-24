/** @format */

import React from "react";
import { Button } from "@/components/ui/button";

interface RemunerationSectionProps {
  baseHourlyRate: string;
  supplementation: string;
  overtime: string;
  statutory: string;
}

const RemunerationSection: React.FC<RemunerationSectionProps> = ({
  baseHourlyRate,
  supplementation,
  overtime,
  statutory,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-6">Remuneration</h2>

      <div className="space-y-4">
        {/* Base Hourly Rate */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Hourly Rate (£ Hour)
            </label>
            <p className="text-sm text-gray-900">{baseHourlyRate}</p>
          </div>
          <Button
            variant="outline"
            className="ml-4 border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Negotiate
          </Button>
        </div>

        {/* Supplementation */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplementation (% Rate)
            </label>
            <p className="text-sm text-gray-900">{supplementation}</p>
          </div>
          <Button
            variant="outline"
            className="ml-4 border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Negotiate
          </Button>
        </div>

        {/* Overtime */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overtime
            </label>
            <p className="text-sm text-gray-900">{overtime}</p>
          </div>
          <Button
            variant="outline"
            className="ml-4 border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Negotiate
          </Button>
        </div>

        {/* Statutory */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statutory
            </label>
            <p className="text-sm text-gray-900">{statutory}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemunerationSection;
