/** @format */

"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useLicenceTypesQuery,
  useUploadLicenceMutation,
} from "@/redux/freatures/settingAPI";
import { toast } from "react-toastify";

interface LicenseUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LicenseUploadModal: React.FC<LicenseUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expiryDate, setExpiryDate] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [stateTerritory, setStateTerritory] = useState("");
  const [licenceNo, setLicenceNo] = useState("");

  const { data: licenceTypesData } = useLicenceTypesQuery();
  const [uploadLicence, { isLoading: isUploading }] =
    useUploadLicenceMutation();

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setExpiryDate("");
      setLicenseType("");
      setStateTerritory("");
      setLicenceNo("");
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !licenseType || !expiryDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("state_or_territory", stateTerritory);
      formData.append("licence_type", licenseType);
      formData.append("licence_no", licenceNo);
      formData.append("licence_images", selectedFile);
      formData.append("expire_date", expiryDate);

      await uploadLicence(formData).unwrap();
      toast.success("Licence uploaded successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to upload licence. Please try again.");
      console.error("Upload error:", error);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            License Upload
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* License Type(s) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Type(s)
            </label>
            <select
              value={licenseType}
              onChange={(e) => setLicenseType(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your company licence type</option>
              {licenceTypesData?.licence_types?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.title}
                </option>
              ))}
            </select>
          </div>

          {/* License Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Upload
            </label>
            <div className="flex items-center gap-2">
              {!selectedFile ? (
                <>
                  <input
                    type="text"
                    placeholder="Upload your Security Agent licence"
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-400 focus:outline-none"
                  />
                  <label className="cursor-pointer">
                    <Button
                      type="button"
                      className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("file-upload")?.click();
                      }}
                    >
                      Upload
                    </Button>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={selectedFile.name}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none"
                  />
                  <Button
                    onClick={handleRemoveFile}
                    variant="outline"
                    className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-sm"
                  >
                    Remove
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* State/Territory */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State/Territory
            </label>
            <input
              type="text"
              placeholder="Enter state or territory"
              value={stateTerritory}
              onChange={(e) => setStateTerritory(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Licence Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Licence Number
            </label>
            <input
              type="text"
              placeholder="Enter licence number"
              value={licenceNo}
              onChange={(e) => setLicenceNo(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* License Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Expiry Date
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSubmit}
            className="bg-blue-900 hover:bg-blue-800 text-white px-16 py-2 rounded text-sm disabled:opacity-50"
            disabled={
              !licenseType || !expiryDate || !selectedFile || isUploading
            }
          >
            {isUploading ? "Uploading..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LicenseUploadModal;
