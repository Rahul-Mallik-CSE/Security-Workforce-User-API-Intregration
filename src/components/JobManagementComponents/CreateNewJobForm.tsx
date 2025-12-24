/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, MapPin } from "lucide-react";

const CreateNewJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    date: "",
    duration: "",
    startTime: "",
    endTime: "",
    payType: "",
    payRate: "",
    payAmount: "",
    operativesRequired: "",
    licenseRequirements: "",
    minimumRating: "",
    accreditationRequirements: "",
    usePreferredGuards: "",
    genderRequirement: "",
    languageRequired: "",
    engagementType: "",
    jobDescription: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleCancel = () => {
    console.log("Form cancelled");
  };

  return (
    <div className="max-w-[1000px] bg-white rounded-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title/Role */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Job Title/Role
          </label>
          <input
            type="text"
            placeholder="Enter job title/role"
            value={formData.jobTitle}
            onChange={(e) =>
              setFormData({ ...formData, jobTitle: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Location
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Workplace location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="button"
              className="px-6 py-2.5 bg-orange-100 text-orange-600 rounded-md hover:bg-orange-200 transition-colors text-sm font-medium"
            >
              <MapPin className="w-4 h-4 mr-1" />
              Map
            </Button>
          </div>
        </div>

        {/* Date and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Date
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="14 April, 2025"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Duration
            </label>
            <input
              type="text"
              placeholder="auto - 19ad"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Start Time and End Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Start Time
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="12:30 PM"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              End Time
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="08:00 AM"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Pay Type and Pay Rate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Pay Type
            </label>
            <Select
              value={formData.payType}
              onValueChange={(value) =>
                setFormData({ ...formData, payType: value })
              }
            >
              <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select rate amount type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nominated">Nominated</SelectItem>
                <SelectItem value="award">Award</SelectItem>
                <SelectItem value="negotiation">By Negotiation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Pay Rate{" "}
              <span className="text-gray-400 font-normal text-xs">
                (Per Operative and Allowances)
              </span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-700">
                  $
                </span>
                <input
                  type="text"
                  placeholder="30"
                  value={formData.payRate}
                  onChange={(e) =>
                    setFormData({ ...formData, payRate: e.target.value })
                  }
                  className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Select
                value={formData.payAmount || "/hour"}
                onValueChange={(value) =>
                  setFormData({ ...formData, payAmount: value })
                }
              >
                <SelectTrigger className="px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 bg-orange-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/hour">/hour</SelectItem>
                  <SelectItem value="/day">/day</SelectItem>
                  <SelectItem value="/week">/week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Operatives Required */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Operatives Required
          </label>
          <input
            type="text"
            placeholder="Enter Operative Require"
            value={formData.operativesRequired}
            onChange={(e) =>
              setFormData({ ...formData, operativesRequired: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Licence Requirements */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Licence Requirements
          </label>
          <Select
            value={formData.licenseRequirements}
            onValueChange={(value) =>
              setFormData({ ...formData, licenseRequirements: value })
            }
          >
            <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-400">
              <SelectValue placeholder="Select Licence Requirements" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="security">Security Operations</SelectItem>
              <SelectItem value="firearm">Firearm License</SelectItem>
              <SelectItem value="crowd">Crowd Control</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Minimum Rating Requirement */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Minimum Rating Requirement
          </label>
          <Select
            value={formData.minimumRating}
            onValueChange={(value) =>
              setFormData({ ...formData, minimumRating: value })
            }
          >
            <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-400">
              <SelectValue placeholder="Select minimum rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Minimum Required</SelectItem>
              <SelectItem value="1">⭐ 1</SelectItem>
              <SelectItem value="2">⭐ 2</SelectItem>
              <SelectItem value="3">⭐ 3</SelectItem>
              <SelectItem value="4">⭐ 4</SelectItem>
              <SelectItem value="5">⭐ 5</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Accreditation Requirements */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Accreditation Requirements
          </label>
          <Select
            value={formData.accreditationRequirements}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                accreditationRequirements: value,
              })
            }
          >
            <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-400">
              <SelectValue placeholder="Select Accreditation requirements" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first-aid">First Aid Certificate</SelectItem>
              <SelectItem value="cpr">CPR Certified</SelectItem>
              <SelectItem value="training">Security Training</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Use Preferred Guards List */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Use Preferred Guards List
          </label>
          <Select
            value={formData.usePreferredGuards}
            onValueChange={(value) =>
              setFormData({ ...formData, usePreferredGuards: value })
            }
          >
            <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-400">
              <SelectValue placeholder="Select preferred guards list or no" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gender Requirement */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Gender Requirement{" "}
            <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <Select
            value={formData.genderRequirement}
            onValueChange={(value) =>
              setFormData({ ...formData, genderRequirement: value })
            }
          >
            <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-400">
              <SelectValue placeholder="Select required gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="any">Any</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Language Required */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Language Required
          </label>
          <Select
            value={formData.languageRequired}
            onValueChange={(value) =>
              setFormData({ ...formData, languageRequired: value })
            }
          >
            <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-400">
              <SelectValue placeholder="Select required language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="mandarin">Mandarin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Engagement Type */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Engagement Type
          </label>
          <Select
            value={formData.engagementType}
            onValueChange={(value) =>
              setFormData({ ...formData, engagementType: value })
            }
          >
            <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-400">
              <SelectValue placeholder="Select engagement type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="permanent">Permanent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Job Description
          </label>
          <textarea
            placeholder="enter Job description"
            value={formData.jobDescription}
            onChange={(e) =>
              setFormData({ ...formData, jobDescription: e.target.value })
            }
            rows={5}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 px-6 py-3 bg-[#1e3a5f] text-white rounded-md hover:bg-[#152a47] transition-colors text-sm font-medium"
          >
            Submit Job Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewJobForm;
