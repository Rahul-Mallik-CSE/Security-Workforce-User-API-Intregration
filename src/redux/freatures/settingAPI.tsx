/** @format */

import baseAPI from "../api/baseAPI";

interface CompanyDetailsResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    company_name: string;
    company: {
      id: number;
      email: string;
      licences: Array<{
        id: number;
        licence_type: number;
        licence_no: string;
        licence_images: Array<{
          file: string;
        }>;
        state_or_territory: string;
        expire_date: string;
      }>;
    };
    phone_number: string;
    address: string;
    state: string;
  };
}

interface UpdateCompanyDetailsRequest {
  company_name: string;
  phone_number: string;
  address: string;
  state: string;
}

interface LicenceTypesResponse {
  success: boolean;
  message: string;
  licence_types: Array<{
    id: number;
    title: string;
  }>;
}

interface ReferralCodeResponse {
  success: boolean;
  message: string;
  referral_code: string;
}

interface InvoicePlan {
  id: number;
  duraton_day: number;
  price: string;
  discriptions: string;
  plan_for: string;
  benefits: number[];
}

interface InvoiceItem {
  id: number;
  invoice_date: string;
  price: string;
  end_date: string;
  is_finished: boolean;
  is_earned: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  plan: InvoicePlan;
}

interface InvoicesResponse {
  success: boolean;
  message: string;
  data: InvoiceItem[];
}

const settingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    profileDetails: builder.query<any, void>({
      query: () => ({
        url: `/api/accounts/user-profile/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["User"],
    }),
    companyDetails: builder.query<CompanyDetailsResponse, void>({
      query: () => `/api/accounts/company-details/`,
      providesTags: ["User"],
    }),
    updateCompanyDetails: builder.mutation<void, UpdateCompanyDetailsRequest>({
      query: (data) => ({
        url: `/api/accounts/company-details/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    licenceTypes: builder.query<LicenceTypesResponse, void>({
      query: () => `/api/jobs/licence-types/`,
    }),
    uploadLicence: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: `/api/accounts/licences/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    getReferralCode: builder.query<ReferralCodeResponse, void>({
      query: () => `/api/accounts/user-refarral-code/`,
    }),
    getInvoices: builder.query<InvoicesResponse, void>({
      query: () => `/api/accounts/get-invoices/`,
      providesTags: ["Billing"],
    }),
  }),
});

export const {
  useProfileDetailsQuery,
  useCompanyDetailsQuery,
  useUpdateCompanyDetailsMutation,
  useLicenceTypesQuery,
  useUploadLicenceMutation,
  useLazyGetReferralCodeQuery,
  useGetInvoicesQuery,
} = settingAPI;
