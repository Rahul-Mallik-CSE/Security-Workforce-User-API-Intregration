/** @format */

import React from "react";

const ComplianceConfirmation = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">Compliance Confirmation</h2>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="compliance"
          className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
        />
        <label htmlFor="compliance" className="text-sm text-gray-700">
          I (operative/Sub- Contractor), have an up to date and current SIA
          licence valid for the services I or my personnel are required to
          perform in order to place in compliance with the SIA s82 of the
          Private Security Industry Act 2001 ("PSIA"). I
          (operative/Sub-Contractor) understand that in the unlikely case that I
          or my staff do not have the requisite valid license for the type of
          work required and in turn the client may lose that contract. If this
          is the case I will be liable.
        </label>
      </div>
    </div>
  );
};

export default ComplianceConfirmation;
