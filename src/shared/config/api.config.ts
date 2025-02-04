import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
    credentials: "include",
  }),
  tagTypes: ["deals", "profile", "contributions", "space"],
  endpoints: () => ({}),
});
