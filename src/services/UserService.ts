import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, isJsonContentType, processError, processResponse } from '../utils/requestutils';
import { IResponse } from '../models/IResponse';
import { QrCodeRequest, User } from '../models/IUser';
import { IUserRequest } from '../models/ICredentials';
import { Http } from '../enum/http.method';

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include', isJsonContentType }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        fetchUser: builder.query<IResponse<User>, void>({
            query: () => ({
                url: '/profile',
                method: 'GET',
            }),
            keepUnusedDataFor: 120,
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            providesTags: (result, error) => ['User']
        }),
        loginUser: builder.mutation<IResponse<User>, IUserRequest>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError
        }),
        verifyQrCode: builder.mutation<IResponse<User>, QrCodeRequest>({
            query: (qrCodeRequest) => ({
                url: '/verify/qrcode',
                method: Http.POST,
                body: qrCodeRequest
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        })
    }),
});