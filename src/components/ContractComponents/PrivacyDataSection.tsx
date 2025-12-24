/** @format */

import React from "react";

const PrivacyDataSection = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">Privacy & Data</h2>

      <div className="space-y-4">
        {/* Information Text */}
        <p className="text-sm text-gray-700">
          In accordance with UK law, Security Guard 1 acts as the data
          controller with the SIA Register as our third party data processor
          (please refer to the data processor website for additional privacy
          details). Security Guard 1 will only use your information we collect
          and receive about you.
        </p>

        {/* Data Use Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-900">Data Use</h3>
          <p className="text-sm text-gray-700">
            Security Guard 1 will only use the information we collect and
            process about you in a manner consistent with this privacy policy,
            unless we have your prior consent for a different use. Security
            Guard 1 will use information collected or generated about you for
            the following general purposes: products and services provision,
            billing, identification and authentication, services improvement,
            contact, research, and anonymous reporting. For further information
            on how Security Guard 1 will use this data, refer to this document.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyDataSection;
