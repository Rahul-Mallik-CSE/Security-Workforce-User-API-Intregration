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
  state_or_territory: string;
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
    selectedState: "",
    licenseRequirements: [] as number[],
    minimumRating: "",
    accreditationRequirements: [] as number[],
    usePreferredGuards: "",
    genderRequirement: "",
    languageRequired: "",
    engagementType: "",
    providentFund: "0",
    jobDescription: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [showShortenedLinkModal, setShowShortenedLinkModal] = useState(false);

  // Fetch license and certificate types
  const { data: licenseData } = useGetLicenseTypesQuery({});
  const { data: certificateData } = useGetCertificateTypesQuery({});
  const [createJobPost, { isLoading }] = useCreateJobPostMutation();

  // Auto-calculate duration when start and end times change
  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      const [startHour, startMin] = formData.startTime.split(":").map(Number);
      const [endHour, endMin] = formData.endTime.split(":").map(Number);

      let durationInMinutes =
        endHour * 60 + endMin - (startHour * 60 + startMin);

      // If end time is before start time, assume it's the next day
      if (durationInMinutes < 0) {
        durationInMinutes += 24 * 60;
      }

      const durationInHours = (durationInMinutes / 60).toFixed(2);
      setFormData((prev) => ({ ...prev, duration: durationInHours }));
    }
  }, [formData.startTime, formData.endTime]);

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
        setShowShortenedLinkModal(true);
        return null;
      }

      // For other URLs without coordinates
      toast.warning(
        "No coordinates found. Please drop a pin on the map and copy the URL with coordinates",
        { autoClose: 5000 },
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
    if (errors.mapLink) setErrors({ ...errors, mapLink: false });

    if (link) {
      const coordinates = extractCoordinatesFromMapLink(link);
      // console.log(coordinates);
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

    // Validation for required fields
    const newErrors: { [key: string]: boolean } = {};
    if (!formData.jobTitle.trim()) newErrors.jobTitle = true;

    if (!formData.location.trim()) newErrors.location = true;
    if (!formData.mapLink.trim()) newErrors.mapLink = true;
    if (!formData.date) newErrors.date = true;
    if (!formData.jobExpire) newErrors.jobExpire = true;
    if (!formData.startTime) newErrors.startTime = true;
    if (!formData.endTime) newErrors.endTime = true;
    if (!formData.payType) newErrors.payType = true;
    if (!formData.payRate.trim()) newErrors.payRate = true;
    if (!formData.operativesRequired.trim())
      newErrors.operativesRequired = true;
    if (formData.licenseRequirements.length === 0)
      newErrors.licenseRequirements = true;
    if (!formData.minimumRating) newErrors.minimumRating = true;
    if (!formData.usePreferredGuards) newErrors.usePreferredGuards = true;
    if (!formData.languageRequired) newErrors.languageRequired = true;
    if (!formData.engagementType) newErrors.engagementType = true;
    if (!formData.jobDescription.trim()) newErrors.jobDescription = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields.");
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Existing validation
    if (!formData.latitude || !formData.longitude) {
      toast.error("Please provide a valid Google Maps link with coordinates");
      return;
    }

    // Prepare data for API
    const jobPostData: any = {
      job_title: formData.jobTitle,
      job_role: formData.jobTitle,
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
      licence_type_requirements_ss: formData.licenseRequirements,
      min_rating_requirements: parseInt(formData.minimumRating) || 0,
      is_preferred_guard: formData.usePreferredGuards,
      gender_requirements: formData.genderRequirement || null,
      language_requirements: formData.languageRequired,
      status: "untasked",
      engagement_type: formData.engagementType,
      provident_fund: parseInt(formData.providentFund) || 0,
      job_details: formData.jobDescription,
    };

    // Only include accreditations_requirements_ss if there are selected accreditations
    if (formData.accreditationRequirements.length > 0) {
      jobPostData.accreditations_requirements_ss =
        formData.accreditationRequirements;
    }

    try {
      const response = await createJobPost(jobPostData).unwrap();
      toast.success("Job posted successfully!");
      setErrors({});
      router.push("/job-management");
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        "You need the Subscription and admin verification to create a job.";
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
            Job Title
          </label>
          <input
            type="text"
            placeholder="Enter job title"
            value={formData.jobTitle}
            onChange={(e) => {
              setFormData({ ...formData, jobTitle: e.target.value });
              if (errors.jobTitle) setErrors({ ...errors, jobTitle: false });
            }}
            className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.jobTitle ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Location Address
          </label>
          <input
            type="text"
            placeholder="Enter Job location address"
            value={formData.location}
            onChange={(e) => {
              setFormData({ ...formData, location: e.target.value });
              if (errors.location) setErrors({ ...errors, location: false });
            }}
            className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            required
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
              className={`flex-1 px-4 py-2.5 border rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.mapLink ? "border-red-500" : "border-gray-300"
              }`}
              required
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
                onChange={(e) => {
                  setFormData({ ...formData, date: e.target.value });
                  if (errors.date) setErrors({ ...errors, date: false });
                }}
                className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.date ? "border-red-500" : "border-gray-300"
                }`}
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
                onChange={(e) => {
                  setFormData({ ...formData, jobExpire: e.target.value });
                  if (errors.jobExpire)
                    setErrors({ ...errors, jobExpire: false });
                }}
                className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.jobExpire ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
            </div>
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
                type="time"
                value={formData.startTime}
                onChange={(e) => {
                  setFormData({ ...formData, startTime: e.target.value });
                  if (errors.startTime)
                    setErrors({ ...errors, startTime: false });
                }}
                className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.startTime ? "border-red-500" : "border-gray-300"
                }`}
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
                onChange={(e) => {
                  setFormData({ ...formData, endTime: e.target.value });
                  if (errors.endTime) setErrors({ ...errors, endTime: false });
                }}
                className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.endTime ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
            </div>
          </div>
        </div>

        {/* Duration (Auto-calculated) */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Duration (in hours)
          </label>
          <input
            type="text"
            placeholder="Select start and end time to auto-calculate"
            value={formData.duration}
            disabled
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder:text-gray-400 bg-gray-50 cursor-not-allowed"
          />
        </div>

        {/* Pay Type and Pay Rate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Pay Type
            </label>
            <Select
              value={formData.payType}
              onValueChange={(value) => {
                setFormData({ ...formData, payType: value });
                if (errors.payType) setErrors({ ...errors, payType: false });
              }}
            >
              <SelectTrigger
                className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.payType ? "border-red-500" : "border-gray-300"
                }`}
              >
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
                onChange={(e) => {
                  setFormData({ ...formData, payRate: e.target.value });
                  if (errors.payRate) setErrors({ ...errors, payRate: false });
                }}
                className={`w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-7 pr-4 py-2.5 border rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.payRate ? "border-red-500" : "border-gray-300"
                }`}
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
            onChange={(e) => {
              setFormData({ ...formData, operativesRequired: e.target.value });
              if (errors.operativesRequired)
                setErrors({ ...errors, operativesRequired: false });
            }}
            className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.operativesRequired ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
        </div>

        {/* Use Preferred Guards List */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Use Preferred Operatives List
          </label>
          <Select
            value={formData.usePreferredGuards}
            onValueChange={(value) => {
              setFormData({ ...formData, usePreferredGuards: value });
              if (errors.usePreferredGuards)
                setErrors({ ...errors, usePreferredGuards: false });
            }}
          >
            <SelectTrigger
              className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-400 ${
                errors.usePreferredGuards ? "border-red-500" : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Yes or No" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* State Selection for Licence Requirements */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            State or Territory
          </label>
          <Select
            value={formData.selectedState}
            onValueChange={(value) => {
              setFormData({
                ...formData,
                selectedState: value,
                licenseRequirements: [], // Clear licences when state changes
              });
              if (errors.licenseRequirements)
                setErrors({ ...errors, licenseRequirements: false });
            }}
          >
            <SelectTrigger
              className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-400 ${
                errors.selectedState ? "border-red-500" : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {(
                Array.from(
                  new Set(
                    licenseData?.licence_types?.map(
                      (l: LicenseType) => l.state_or_territory,
                    ),
                  ),
                ) as string[]
              ).map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Licence Requirements */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Security Guard Licence Types{" "}
            <span className="text-gray-400 font-normal text-xs">
              (Multiple)
            </span>
          </label>
          <div
            className={`w-full px-4 py-2.5 border rounded-md text-sm min-h-[42px] ${
              errors.licenseRequirements ? "border-red-500" : "border-gray-300"
            }`}
          >
            {formData.licenseRequirements.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.licenseRequirements.map((licenseId) => {
                  const license = licenseData?.licence_types?.find(
                    (l: LicenseType) => l.id === licenseId,
                  );
                  return (
                    <div
                      key={licenseId}
                      className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                    >
                      <span>{license?.title}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            licenseRequirements:
                              formData.licenseRequirements.filter(
                                (id) => id !== licenseId,
                              ),
                          });
                        }}
                        className="hover:text-blue-900"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <span className="text-gray-400 text-sm">
                Select Licence Requirements
              </span>
            )}
          </div>
          <Select
            value=""
            disabled={!formData.selectedState}
            onValueChange={(value) => {
              const licenseId = parseInt(value);
              if (!formData.licenseRequirements.includes(licenseId)) {
                setFormData({
                  ...formData,
                  licenseRequirements: [
                    ...formData.licenseRequirements,
                    licenseId,
                  ],
                });
                if (errors.licenseRequirements)
                  setErrors({ ...errors, licenseRequirements: false });
              }
            }}
          >
            <SelectTrigger
              className={`w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 mt-2 ${!formData.selectedState ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <SelectValue
                placeholder={
                  formData.selectedState
                    ? "Add a licence"
                    : "Select a state first"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {licenseData?.licence_types
                ?.filter(
                  (license: LicenseType) =>
                    !formData.licenseRequirements.includes(license.id) &&
                    license.state_or_territory === formData.selectedState,
                )
                .map((license: LicenseType) => (
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
            onValueChange={(value) => {
              setFormData({ ...formData, minimumRating: value });
              if (errors.minimumRating)
                setErrors({ ...errors, minimumRating: false });
            }}
          >
            <SelectTrigger
              className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-400 ${
                errors.minimumRating ? "border-red-500" : "border-gray-300"
              }`}
            >
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
            Accreditation Requirements{" "}
            <span className="text-gray-400 font-normal text-xs">
              (Multiple)
            </span>
          </label>
          <div
            className={`w-full px-4 py-2.5 border rounded-md text-sm min-h-[42px] ${
              errors.accreditationRequirements
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            {formData.accreditationRequirements.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.accreditationRequirements.map((certId) => {
                  const cert = certificateData?.certificate_types?.find(
                    (c: CertificateType) => c.id === certId,
                  );
                  return (
                    <div
                      key={certId}
                      className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                    >
                      <span>{cert?.title}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            accreditationRequirements:
                              formData.accreditationRequirements.filter(
                                (id) => id !== certId,
                              ),
                          });
                        }}
                        className="hover:text-blue-900"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <span className="text-gray-400 text-sm">
                Select Accreditation Requirements
              </span>
            )}
          </div>
          <Select
            value=""
            onValueChange={(value) => {
              const certId = parseInt(value);
              if (!formData.accreditationRequirements.includes(certId)) {
                setFormData({
                  ...formData,
                  accreditationRequirements: [
                    ...formData.accreditationRequirements,
                    certId,
                  ],
                });
                if (errors.accreditationRequirements)
                  setErrors({ ...errors, accreditationRequirements: false });
              }
            }}
          >
            <SelectTrigger className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 mt-2">
              <SelectValue placeholder="Add an accreditation" />
            </SelectTrigger>
            <SelectContent>
              {certificateData?.certificate_types
                ?.filter(
                  (cert: CertificateType) =>
                    !formData.accreditationRequirements.includes(cert.id),
                )
                .map((cert: CertificateType) => (
                  <SelectItem key={cert.id} value={cert.id.toString()}>
                    {cert.title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Gender Requirement */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Gender Requirement
          </label>
          <Select
            value={formData.genderRequirement}
            onValueChange={(value) => {
              setFormData({ ...formData, genderRequirement: value });
              if (errors.genderRequirement)
                setErrors({ ...errors, genderRequirement: false });
            }}
            required
          >
            <SelectTrigger
              className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-400 ${
                errors.genderRequirement ? "border-red-500" : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Select required gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Any</SelectItem>
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
            onValueChange={(value) => {
              setFormData({ ...formData, languageRequired: value });
              if (errors.languageRequired)
                setErrors({ ...errors, languageRequired: false });
            }}
          >
            <SelectTrigger
              className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-400 ${
                errors.languageRequired ? "border-red-500" : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Select required language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="mandarin">Mandarin Chinese</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="arabic">Arabic</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="portuguese">Portuguese</SelectItem>
              <SelectItem value="russian">Russian</SelectItem>
              <SelectItem value="bangali">Bangali</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
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
            onValueChange={(value) => {
              setFormData({ ...formData, engagementType: value });
              if (errors.engagementType)
                setErrors({ ...errors, engagementType: false });
            }}
          >
            <SelectTrigger
              className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-400 ${
                errors.engagementType ? "border-red-500" : "border-gray-300"
              }`}
            >
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
            onChange={(e) => {
              setFormData({ ...formData, jobDescription: e.target.value });
              if (errors.jobDescription)
                setErrors({ ...errors, jobDescription: false });
            }}
            rows={5}
            className={`w-full px-4 py-2.5 border rounded-md text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              errors.jobDescription ? "border-red-500" : "border-gray-300"
            }`}
            required
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

      {/* Shortened Link Modal */}
      {showShortenedLinkModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-orange-600">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Shortened Link Detected!
              </h3>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                To get the coordinates from a shortened Google Maps link, please
                follow these steps:
              </p>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="font-semibold text-orange-600">1.</span>
                  <span>Click the "Open Map" button</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-orange-600">2.</span>
                  <span>Search and select your location on the map</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-orange-600">3.</span>
                  <span>Copy the full URL from your browser's address bar</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-orange-600">4.</span>
                  <span>Paste the full URL back into this field</span>
                </li>
              </ol>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setShowShortenedLinkModal(false);
                  handleOpenMap();
                }}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                Open Map
              </Button>
              <Button
                type="button"
                onClick={() => setShowShortenedLinkModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Got It
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewJobForm;
