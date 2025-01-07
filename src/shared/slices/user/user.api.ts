import { api } from '@/shared/config/api.config';
import { IGetProfileResponse } from './user.interface';

const profileAPi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IGetProfileResponse, null>({
      query: () => ({
        url: `/user/profile`,
        method: 'GET'
      }),
      providesTags: ['profile']
    })
  })
});

export const { useGetProfileQuery, useLazyGetProfileQuery } = profileAPi;
