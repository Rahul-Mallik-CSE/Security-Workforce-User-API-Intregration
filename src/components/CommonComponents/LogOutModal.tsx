/** @format */

"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center text-2xl font-semibold text-red-500">
            <LogOut className="mr-2 h-6 w-6" /> Sign Out
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <h3 className="mb-6 text-xl font-semibold text-center">
            Are you sure you want to{" "}
            <span className="font-bold text-red-500">sign out?</span>
          </h3>

          <div className="flex justify-center gap-4 w-full">
            <Button variant="outline" onClick={onClose} className="w-1/2">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="w-1/2 text-white bg-red-500 hover:bg-red-600"
            >
              Yes, Sign Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
