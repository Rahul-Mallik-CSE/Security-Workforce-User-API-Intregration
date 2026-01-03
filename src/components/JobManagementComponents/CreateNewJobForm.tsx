/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, MapPin } from "lucide-react";
import {
  useGetLicenseTypesQuery,
  useGetCertificateTypesQuery,
  useCreateJobPostMutation,
} from "@/redux/freatures/jobManagementAPI";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface LicenseType {
  id: number;
  title: string;
}

interface CertificateType {
  id: number;
  title: string;
}

const CreateNewJobForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobRole: "",
    mapLink: "",
    latitude: "",
    longitude: "",
    location: "",
    date: "",
    jobExpire: "",
    duration: "",
    startTime: "",
    endTime: "",
    payType: "",
    payRate: "",
    operativesRequired: "",
    licenseRequirements: "",
    minimumRating: "",
    accreditationRequirements: "",
    usePreferredGuards: "",
    genderRequirement: "",
    languageRequired: "",
    engagementType: "",
    providentFund: "0",
    jobDescription: "",
  });

  // Fetch license and certificate types
  const { data: licenseData } = useGetLicenseTypesQuery({});
  const { data: certificateData } = useGetCertificateTypesQuery({});
  const [createJobPost, { isLoading }] = useCreateJobPostMutation();

  // Extract latitude and longitude from Google Maps URL
  const extractCoordinatesFromMapLink = (url: string) => {
    try {
      // Return null for empty URL without showing error
      if (!url || url.trim() === "") {
        return null;
      }

      // Pattern 1: @lat,lng,zoom format (most common)
      // Example: https://www.google.com/maps/@23.7852142,90.4021522,15z
      const pattern1 = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/;
      const match1 = url.match(pattern1);

      if (match1) {
        return {
          latitude: match1[1],
          longitude: match1[2],
        };
      }

      // Pattern 2: query parameter format
      // Example: https://www.google.com/maps?q=23.7852142,90.4021522
      const pattern2 = /[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
      const match2 = url.match(pattern2);

      if (match2) {
        return {
          latitude: match2[1],
          longitude: match2[2],
        };
      }

      // Pattern 3: /place/ with coordinates
      // Example: https://www.google.com/maps/place/23.7852142,90.4021522
      const pattern3 = /place\/(-?\d+\.?\d*),(-?\d+\.?\d*)/;
      const match3 = url.match(pattern3);

      if (match3) {
        return {
          latitude: match3[1],
          longitude: match3[2],
        };
      }

      // Pattern 4: ll parameter
      // Example: https://www.google.com/maps?ll=23.7852142,90.4021522
      const pattern4 = /[?&]ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
      const match4 = url.match(pattern4);

      if (match4) {
        return {
          latitude: match4[1],
          longitude: match4[2],
        };
      }

      // If it's a shortened URL (goo.gl or maps.app.goo.gl), show specific instruction
      if (url.includes("goo.gl") || url.includes("maps.app.goo.gl")) {
        toast.warning(
          "Shortened link detected! Please: 1) Open the link, 2) Right-click on the map, 3) Click the coordinates to copy, 4) Or use 'Share' → 'Copy link' for the full URL",
          { autoClose: 8000 }
        );
        return null;
      }

      // For other URLs without coordinates
      toast.warning(
        "No coordinates found. Please drop a pin on the map and copy the URL with coordinates",
        { autoClose: 5000 }
      );
      return null;
    } catch (error) {
      toast.error("Invalid map link format");
      return null;
    }
  };

  // Handle map link change
  const handleMapLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setFormData({ ...formData, mapLink: link });

    if (link) {
      const coordinates = extractCoordinatesFromMapLink(link);
      if (coordinates) {
        setFormData({
          ...formData,
          mapLink: link,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        });
        toast.success("Coordinates extracted successfully!");
      }
    }
  };

  // Open Google Maps in new tab
  const handleOpenMap = () => {
    window.open("https://www.google.com/maps", "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.latitude || !formData.longitude) {
      toast.error("Please provide a valid Google Maps link with coordinates");
      return;
    }

    // Prepare data for API
    const jobPostData = {
      job_title: formData.jobTitle,
      job_role: formData.jobRole || formData.jobTitle,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      address: formData.location,
      job_date: formData.date,
      job_expire: formData.jobExpire,
      start_time: formData.startTime,
      end_time: formData.endTime,
      job_duration: parseInt(formData.duration) || 0,
      pay_type: formData.payType,
      pay_rate: formData.payRate,
      operative_required: parseInt(formData.operativesRequired) || 0,
      licence_type_requirements: parseInt(formData.licenseRequirements) || 0,
      min_rating_requirements: parseInt(formData.minimumRating) || 0,
      accreditations_requirements:
        parseInt(formData.accreditationRequirements) || 0,
      is_preferred_guard: formData.usePreferredGuards,
      gender_requirements: formData.genderRequirement,
      language_requirements: formData.languageRequired,
      status: "published",
      engagement_type: formData.engagementType,
      provident_fund: parseInt(formData.providentFund) || 0,
      job_details: formData.jobDescription,
    };

    try {
      const response = await createJobPost(jobPostData).unwrap();
      toast.success("Job posted successfully!");
      router.push("/job-management");
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to create job post";
      toast.error(errorMessage);
      console.error("Error creating job:", error);
    }
  };

  const handleCancel = () => {
    router.back();
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

        {/* Job Role */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Job Role
          </label>
          <input
            type="text"
            placeholder="Enter job role"
            value={formData.jobRole}
            onChange={(e) =>
              setFormData({ ...formData, jobRole: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Location Address
          </label>
          <input
            type="text"
            placeholder="Enter workplace location address"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Google Map Link */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Google Map Link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste Google Maps link here"
              value={formData.mapLink}
              onChange={handleMapLinkChange}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="button"
              onClick={handleOpenMap}
              className="px-6 py-2.5 bg-orange-100 text-orange-600 rounded-md hover:bg-orange-200 transition-colors text-sm font-medium"
            >
              <MapPin className="w-4 h-4 mr-1" />
              Open Map
            </Button>
          </div>
          {formData.latitude && formData.longitude && (
            <p className="text-xs text-green-600 mt-1">
              Coordinates: {formData.latitude}, {formData.longitude}
            </p>
          )}
        </div>

        {/* Job Date and Expiry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Job Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Job Expiry Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.jobExpire}
                onChange={(e) =>
                  setFormData({ ...formData, jobExpire: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Duration (in hours) */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Duration (in hours)
          </label>
          <input
            type="number"
            placeholder="Enter duration in hours"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Start Time and End Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Start Time
            </label>
            <div className="relative">
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              End Time
            </label>
            <div className="relative">
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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
                <SelectItem value="negotiation">Negotiation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Pay Rate{" "}
              <span className="text-gray-400 font-normal text-xs">
                (Per hour)
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-700">
                $
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="25.00"
                value={formData.payRate}
                onChange={(e) =>
                  setFormData({ ...formData, payRate: e.target.value })
                }
                className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Operatives Required */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Operatives Required
          </label>
          <input
            type="number"
            min="1"
            placeholder="Enter number of operatives required"
            value={formData.operativesRequired}
            onChange={(e) =>
              setFormData({ ...formData, operativesRequired: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
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
              {licenseData?.licence_types?.map((license: LicenseType) => (
                <SelectItem key={license.id} value={license.id.toString()}>
                  {license.title}
                </SelectItem>
              ))}
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
              <SelectItem value="0">No Minimum Required</SelectItem>
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
              {certificateData?.certificate_types?.map(
                (cert: CertificateType) => (
                  <SelectItem key={cert.id} value={cert.id.toString()}>
                    {cert.title}
                  </SelectItem>
                )
              )}
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
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-[#1e3a5f] text-white rounded-md hover:bg-[#152a47] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Submit Job Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewJobForm;
