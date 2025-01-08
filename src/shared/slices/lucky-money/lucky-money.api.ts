import { api } from '@/shared/config/api.config';
import { BaseResponse } from '@/shared/types';
import { LuckyMoney } from '@prisma/client';


const luckyMoneyApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createLuckyMoney: builder.mutation<any, { name: string }>({
            query: (body) => ({
                url: '/lucky-money',
                method: 'POST',
                body
            }),
            transformResponse: (response: BaseResponse<LuckyMoney>) => response.data
        }),
        // deleteLuckyMoney: builder.mutation<any, { id: string }>({
        //     query: ({ id }) => ({
        //         url: `/lucky-money/${id}`,
        //         method: 'DELETE'
        //     }),
        //     transformResponse: (response: BaseResponse<any>) => response.data
        // }),
        // updateLuckyMoney: builder.mutation<any, { id: string; body: LuckyMoneyPayloadDto }>({
        //     query: ({ id, body }) => ({
        //         url: `/lucky-money/${id}`,
        //         method: 'PUT',
        //         body
        //     }),
        //     transformResponse: (response: BaseResponse<LuckyMoney>) => response.data
        // }),
        getLuckyMoneys: builder.query<LuckyMoney[], void>({
            query: () => {
                return {
                    url: "/lucky-money",
                    method: 'GET'
                };
            },
            transformResponse: (response: BaseResponse<LuckyMoney[]>) => response.data
        })
    }),
    overrideExisting: true
});

export const {
    useCreateLuckyMoneyMutation,
    // useDeleteLuckyMoneyMutation,
    // useUpdateLuckyMoneyMutation,
    useGetLuckyMoneysQuery
} = luckyMoneyApi;