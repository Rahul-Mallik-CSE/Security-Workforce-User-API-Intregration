/** @format */

"use client";

import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SignUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signatureUrl: string) => void;
}

const SignUploadModal: React.FC<SignUploadModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLegalConfirmed, setIsLegalConfirmed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        alert("File size must be less than 1MB");
        return;
      }

      // Validate file type
      const validTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/bmp",
        "image/gif",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (png, jpg, jpeg, bmp, gif)");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    if (!selectedFile) {
      alert("Please upload a signature image");
      return;
    }
    if (!isLegalConfirmed) {
      alert(
        "Please confirm that this is a legal representation of your signature"
      );
      return;
    }
    onSave(previewUrl);
    handleClose();
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setIsLegalConfirmed(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Upload Your Signature
          </DialogTitle>
        </DialogHeader>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6 text-center">
          {previewUrl ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={previewUrl}
                  alt="Signature preview"
                  className="max-h-32 object-contain"
                />
              </div>
              <button
                onClick={handleUploadClick}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Change signature
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-700 mb-2">
                Upload a photo of your signature.
              </p>
              <p className="text-gray-600 text-sm mb-1">Max file size: 1MB</p>
              <p className="text-gray-600 text-sm mb-6">
                png, jpg, jpeg, bmp, gif
              </p>
              <Button
                onClick={handleUploadClick}
                className="px-6 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload photo
              </Button>
            </>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.bmp,.gif"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Legal Confirmation Checkbox */}
        <div className="mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isLegalConfirmed}
              onChange={(e) => setIsLegalConfirmed(e.target.checked)}
              className="mt-1 w-4 h-4 accent-blue-900"
            />
            <span className="text-gray-600 text-sm">
              I understand this is a legal representation of my signature.
            </span>
          </label>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSave}
            disabled={!selectedFile || !isLegalConfirmed}
            className="px-16 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUploadModal;
