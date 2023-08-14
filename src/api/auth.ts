import { AuthSignin, AuthSignup } from '@/interfaces/auth';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args)=>{
            await pause(1000);
           return fetch(...args)
       }
    }),
    endpoints: (builder) => ({
        signup: builder.mutation<{ message: string, accessToken: string, user: {} }, AuthSignup>({
            query: (credentials) => ({
                url: '/user/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        signin: builder.mutation<{ message: string, accessToken: string, user: {} }, AuthSignin>({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});
export const { useSignupMutation, useSigninMutation } = authApi;

export default authApi;