/** @format */

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface PayrollData {
  id: string;
  jobId: string;
  operativeName: string;
  duration: string;
  payRate: string;
  total: string;
  date: string;
  status: "Paid" | "Unpaid";
}

export interface ReferralUserData {
  id: string;
  userName: string;
  email: string;
  joinDate: string;
  subscribed: "Yes" | "No";
  status: "Earned" | "Pending";
  address?: string;
  purchaseDate?: string;
}

export interface OperativeTrackerData {
  id: string;
  jobId: string;
  operativeName: string;
  jobRole: string;
  jobDate: string;
  location: string;
  status: "Shift Complete" | "On-Duty" | "Not Started";
  rating: number | null;
  duration?: string;
  ratePerHour?: string;
  checkIn?: string;
  checkOut?: string;
}

export interface RatingCategory {
  id: string;
  category: string;
  rating: number;
}

export interface PreferredOperativeData {
  id: string;
  operativeId: string;
  operativeName: string;
  licences: string;
  accreditations: string;
  rating: number;
  status: "Interested" | "Hired";
  profileImage?: string;
  state?: string;
  jobExperience?: string;
  licenceNumber?: string;
  licenceExpiryDate?: string;
  securityOperations?: string[];
  firearms?: string[];
  otherNotes?: string;
}

export interface JobManagementData {
  id: string;
  jobId: string;
  role: string;
  location: string;
  date: string;
  duration: string;
  startTime: string;
  payRate: string;
  required: number;
  selected: number;
  status: "Tasked" | "In Progress" | "Untasked";
}

// API Response Types
export interface JobPostAPIResponse {
  id: number;
  applications: any[];
  job_provider: {
    id: number;
    company: {
      id: number;
      first_name: string;
      email: string;
      is_email_varified: boolean;
      create_at: string;
      updated_at: string;
      image: string | null;
      last_activity: string;
      user_type: string;
      gender: string;
      is_admin_aproved: boolean;
      is_admin_rejected: boolean;
      is_subscribe: boolean;
    };
    company_name: string | null;
    phone_number: string | null;
    average_rating_main: string;
    average_comunication: string;
    average_reliability: string;
    average_pay_rate: string;
    average_professionalism: string;
    average_job_support: string;
  };
  selected_list: any[];
  job_title: string;
  latitude: number;
  longitude: number;
  address: string;
  job_date: string;
  start_time: string;
  end_time: string;
  job_duration: string;
  pay_type: string;
  pay_rate: string;
  operative_required: number;
  licence_type_requirements: number;
  min_rating_requirements: number;
  accreditations_requirements: number;
  is_preferred_guard: string;
  gender_requirements: string;
  language_requirements: string;
  status: string;
  engagement_type: string;
  provident_fund: number;
  job_details: string;
  created_at: string;
  updated_at: string;
}

export interface JobPostsResponse {
  success: boolean;
  message: string;
  jobs_posts: JobPostAPIResponse[];
}

export interface JobDetailsData {
  id: string;
  jobTitle: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  duration: string;
  licenseRequirements: string;
  payRateType: string;
  payAmount: string;
  minimumRating: string;
  usePreferredOperatives: string;
  description: string;
  status?: "Tasked" | "In Progress" | "Untasked";
}

export interface ApplicantData {
  id: string;
  operativeName: string;
  jobRole: string;
  rating: number;
  jobExperience: string;
  profileImage?: string;
  status?: "selected" | "pending";
}

export interface ContractData {
  id: string;
  contractId: string;
  operativeName: string;
  jobRole: string;
  dateCreated: string;
  status: "Cancelled" | "Pending" | "Complete" | "Signed";
  amendRequest: "Pending" | "Accepted" | "Reject";
}

// Job Details API Response Types
export interface JobDetailsAPICandidate {
  id: number;
  first_name: string;
  email: string;
  is_email_varified: boolean;
  create_at: string;
  updated_at: string;
  image: string | null;
  last_activity: string;
  user_type: string;
  gender: string;
  is_admin_aproved: boolean;
  is_admin_rejected: boolean;
  is_subscribe: boolean;
  exprience_in_years: number;
}

export interface JobDetailsAPIApplication {
  id: number;
  status: string;
  candidate: JobDetailsAPICandidate;
  currency: string;
  is_admin_aproved: boolean;
  avg_rating_main: string;
  avg_presentation_grooming: string;
  avg_communication: string;
  avg_reports_administration: string;
  avg_punctuality_reliability: string;
  avg_skills_attributes: string;
}

export interface JobDetailsAPIData {
  id: number;
  applications: JobDetailsAPIApplication[];
  job_provider: any;
  selected_list: any[];
  job_title: string;
  latitude: number;
  longitude: number;
  address: string;
  job_date: string;
  start_time: string;
  end_time: string;
  job_duration: string;
  pay_type: string;
  pay_rate: string;
  operative_required: number;
  licence_type_requirements: number;
  min_rating_requirements: number;
  accreditations_requirements: number;
  is_preferred_guard: string;
  gender_requirements: string;
  language_requirements: string;
  status: string;
  engagement_type: string;
  provident_fund: number;
  job_details: string;
  created_at: string;
  updated_at: string;
}

export interface JobDetailsAPIResponse {
  success: boolean;
  message: string;
  data: JobDetailsAPIData;
}
