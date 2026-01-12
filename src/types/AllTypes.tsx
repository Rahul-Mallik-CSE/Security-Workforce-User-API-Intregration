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
  isPaid: boolean;
  email?: string;
  startTime?: string;
  endTime?: string;
  jobDetails?: string;
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
  is_shift_end: boolean;
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
  candidateId?: number;
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
  status: "Cancelled" | "Pending" | "Complete" | "Signed" | "Not Pay";
  amendRequest: "Pending" | "Accepted" | "Reject" | "Not Amend";
  originalAmendStatus: string;
  email?: string;
  jobDate?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  payRate?: string;
  totalAmount?: string;
  jobDetails?: string;
  address?: string;
  engagementType?: string;
}

// Contract API Response Types
export interface ContractAPICandidate {
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

export interface ContractAPIApplication {
  id: number;
  status: string;
  candidate: ContractAPICandidate;
  currency: string;
  is_admin_aproved: boolean;
  avg_rating_main: string;
  avg_presentation_grooming: string;
  avg_communication: string;
  avg_reports_administration: string;
  avg_punctuality_reliability: string;
  avg_skills_attributes: string;
}

export interface ContractAPIJobDetails {
  id: number;
  job_title: string;
  address: string;
  job_date: string;
  start_time: string;
  end_time: string;
  job_duration: string;
  pay_type: string;
  pay_rate: string;
  engagement_type: string;
  job_details: string;
  created_at: string;
  updated_at: string;
}

export interface ContractAPIEngagement {
  id: number;
  job_details: ContractAPIJobDetails;
  application: ContractAPIApplication;
  operative_trackers: string;
  contacts_trackers: string;
  amend_trackers: string;
  amend_details: string;
  new_end_time: string | null;
  total_amount: string;
  new_job_duration: string;
  signature_party_a: string;
  signature_party_b: string;
}

export interface ContractsAPIResponse {
  success: boolean;
  message: string;
  engagements: ContractAPIEngagement[];
}

export interface AmendContractRequest {
  new_end_time: string;
  detail_amendment: string;
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

// Referral User API Response Types
export interface ReferralUserAPIResponse {
  id: number;
  email: string;
  first_name: string;
  phone: string | null;
  is_email_varified: boolean;
  user_type: string;
  is_subscribe: boolean;
  is_earned: boolean;
  gender: string;
  language: string | null;
  address: string;
  create_at: string;
}

export interface ReferralUsersAPIResponse {
  success: boolean;
  message: string;
  users: ReferralUserAPIResponse[];
}

// Operatives Tracker API Response Types
export interface OperativeTrackerAPICandidate {
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

export interface OperativeTrackerAPIApplication {
  id: number;
  status: string;
  candidate: OperativeTrackerAPICandidate;
  currency: string;
  is_admin_aproved: boolean;
  avg_rating_main: string;
  avg_presentation_grooming: string;
  avg_communication: string;
  avg_reports_administration: string;
  avg_punctuality_reliability: string;
  avg_skills_attributes: string;
}

export interface OperativeTrackerAPIJobDetails {
  id: number;
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

export interface OperativeTrackerAPIItem {
  id: number;
  job_details: OperativeTrackerAPIJobDetails;
  application: OperativeTrackerAPIApplication;
  operative_trackers: string; // "shift_completed", "on_duty", "notstartyet"
  contacts_trackers: string;
  amend_trackers: string;
  amend_details: string;
  new_end_time: string | null;
  total_amount: string;
  new_job_duration: string;
  is_shift_end: boolean;
  is_company_reted: boolean;
  signature_party_a: string;
  signature_party_b: string;
}

export interface OperativeTrackerAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    success: boolean;
    message: string;
    operatives: OperativeTrackerAPIItem[];
  };
}

export interface RatingData {
  presentation_grooming: number;
  communication: number;
  reports_administration: number;
  punctuality_reliability: number;
  skills_attributes: number;
  text: string;
}

// Payroll API Response Types
export interface PayrollAPIJobDetails {
  id: number;
  job_date: string;
  start_time: string;
  end_time: string;
  job_duration: string;
  provident_fund: number;
  job_details: string;
  pay_rate: string;
  created_at: string;
  updated_at: string;
}

export interface PayrollAPICandidate {
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

export interface PayrollAPIApplication {
  id: number;
  status: string;
  candidate: PayrollAPICandidate;
  currency: string;
  is_admin_aproved: boolean;
  avg_rating_main: string;
  avg_presentation_grooming: string;
  avg_communication: string;
  avg_reports_administration: string;
  avg_punctuality_reliability: string;
  avg_skills_attributes: string;
}

export interface PayrollAPIItem {
  id: number;
  job_details: PayrollAPIJobDetails;
  application: PayrollAPIApplication;
  operative_trackers: string;
  contacts_trackers: string;
  amend_trackers: string;
  amend_details: string;
  new_end_time: string | null;
  total_amount: string;
  new_job_duration: string;
  signature_party_a: string;
  signature_party_b: string;
  paid_a_gaurd?: boolean;
}

export interface PayrollAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    success: boolean;
    message: string;
    pay_roles: PayrollAPIItem[];
  };
}

// Dashboard API Response Types
export interface DashboardOverview {
  unticked_jobs: number;
  jobs_in_progress: number;
  completed_jobs: number;
  average_rating: number;
  industry_rating: number;
}

export interface DashboardWeeklyActivity {
  day: string;
  value: number;
  date: string;
}

export interface DashboardRatingPerformance {
  communication: number;
  payment_reliability: number;
  pay_rates: number;
  Professionalism: number;
  "Job Support": number;
}

export interface DashboardData {
  overview: DashboardOverview;
  weekly_activity: DashboardWeeklyActivity[];
  rating_performance: DashboardRatingPerformance;
}

export interface DashboardAPIResponse {
  success: boolean;
  data: DashboardData;
}

// Contract Details API Response Types
export interface ContractDetailsLicenceImage {
  id: number;
  file: string;
  created_at: string;
  updated_at: string;
}

export interface ContractDetailsLicenceType {
  id: number;
  title: string;
  discription: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContractDetailsLicence {
  id: number;
  state_or_territory: string | null;
  licence_no: string | null;
  expire_date: string | null;
  created_at: string;
  licence_type: ContractDetailsLicenceType | null;
  licence_images: ContractDetailsLicenceImage[];
}

export interface ContractDetailsCandidate {
  id: number;
  first_name: string;
  email: string;
  phone: string | null;
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
  licences: ContractDetailsLicence[];
  accreditations: any[];
  bank_name: string | null;
  account_holder_name: string | null;
  account_no: string | null;
  bank_branch: string | null;
}

export interface ContractDetailsApplication {
  id: number;
  status: string;
  candidate: ContractDetailsCandidate;
  currency: string;
  is_admin_aproved: boolean;
  avg_rating_main: string;
  avg_presentation_grooming: string;
  avg_communication: string;
  avg_reports_administration: string;
  avg_punctuality_reliability: string;
  avg_skills_attributes: string;
}

export interface ContractDetailsCompany {
  id: number;
  first_name: string;
  email: string;
  phone: string | null;
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
  licences: any[];
  accreditations: any[];
  bank_name: string | null;
  account_holder_name: string | null;
  account_no: string | null;
  bank_branch: string | null;
}

export interface ContractDetailsJobProvider {
  id: number;
  company: ContractDetailsCompany;
  company_name: string | null;
  phone_number: string | null;
  abn_number: string | null;
  average_rating_main: string;
  average_comunication: string;
  average_reliability: string;
  average_pay_rate: string;
  average_professionalism: string;
  average_job_support: string;
}

export interface ContractDetailsJobDetails {
  id: number;
  applications: any[];
  job_provider: ContractDetailsJobProvider;
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

export interface ContractDetailsEngagement {
  id: number;
  job_details: ContractDetailsJobDetails;
  application: ContractDetailsApplication;
  operative_trackers: string;
  contacts_trackers: string;
  amend_trackers: string;
  amend_details: string;
  new_end_time: string | null;
  total_amount: string;
  new_job_duration: string;
  signature_party_a: string | null;
  signature_party_b: string | null;
}

export interface ContractDetailsAPIResponse {
  success: boolean;
  message: string;
  engagements: ContractDetailsEngagement;
}

export interface UpdatePayRateRequest {
  pay_rate: number;
}

// Preferred Operatives API Response Types
export interface PreferredOperativeLicenceImage {
  id: number;
  file: string;
  created_at: string;
  updated_at: string;
}

export interface PreferredOperativeLicenceType {
  id: number;
  title: string;
  discription: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PreferredOperativeLicence {
  id: number;
  state_or_territory: string | null;
  licence_no: string | null;
  expire_date: string | null;
  created_at: string;
  licence_type: PreferredOperativeLicenceType;
  licence_images: PreferredOperativeLicenceImage[];
}

export interface PreferredOperativeAccreditationType {
  id: number;
  title: string;
  discription: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PreferredOperativeAccreditation {
  id: number;
  accreditation: string;
  expire_date: string | null;
  created_at: string;
  updated_at: string;
  accreditation_type: PreferredOperativeAccreditationType;
}

export interface PreferredOperativeCandidate {
  id: number;
  first_name: string;
  email: string;
  phone: string;
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
  licences: PreferredOperativeLicence[];
  accreditations: PreferredOperativeAccreditation[];
  bank_name: string;
  account_holder_name: string;
  account_no: string | null;
  bank_branch: string;
}

export interface PreferredOperativeApplication {
  id: number;
  status: string;
  candidate: PreferredOperativeCandidate;
  currency: string;
  is_admin_aproved: boolean;
  avg_rating_main: string;
  avg_presentation_grooming: string;
  avg_communication: string;
  avg_reports_administration: string;
  avg_punctuality_reliability: string;
  avg_skills_attributes: string;
}

export interface PreferredOperativeAPIItem {
  id: number;
  application: PreferredOperativeApplication;
  operative_trackers: string;
  contacts_trackers: string;
  amend_trackers: string;
  amend_details: string;
  job_details: number;
  new_end_time: string;
  total_amount: string;
  new_job_duration: string;
  signature_party_a: string;
  signature_party_b: string;
  note: string;
}

export interface PreferredOperativesAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    success: boolean;
    message: string;
    operatives: PreferredOperativeAPIItem[];
  };
}
