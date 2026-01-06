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
  }),
});

export const {
  useProfileDetailsQuery,
  useCompanyDetailsQuery,
  useUpdateCompanyDetailsMutation,
  useLicenceTypesQuery,
  useUploadLicenceMutation,
  useLazyGetReferralCodeQuery,
} = settingAPI;
