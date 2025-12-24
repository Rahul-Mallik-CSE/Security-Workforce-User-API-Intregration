/** @format */

import React from "react";

interface Props {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, icon }: Props) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-black mb-1">{label}</p>
          <p className="flex items-center gap-2 text-3xl font-bold text-gray-900">
            {icon && <span className="text-yellow-500">{icon}</span>}
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
