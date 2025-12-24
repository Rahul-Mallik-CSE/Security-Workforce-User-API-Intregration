import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseAPI = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }),
    tagTypes: ['Auth'],
    endpoints: () => ({})
})

export default baseAPI;