import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, isJsonContentType, processError, processResponse } from '../utils/requestutils';
import { IResponse } from '../models/IResponse';
import { QrCodeRequest, Role, User, Users } from '../models/IUser';
import { EmailAddress, IRegisterRequest, IUserRequest, UpdateNewPassword, UpdatePassword } from '../models/ICredentials';
import { Http } from '../enum/http.method';

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include', isJsonContentType }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        fetchUser: builder.query<IResponse<User>, void>({
            query: () => ({
                url: '/profile',
                method: Http.GET
            }),
            keepUnusedDataFor: 120,
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            providesTags: () => ['User']
        }),
        loginUser: builder.mutation<IResponse<User>, IUserRequest>({
            query: (credentials) => ({
                url: '/login',
                method: Http.POST,
                body: credentials
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError
        }),
        registerUser: builder.mutation<IResponse<void>, IRegisterRequest>({
            query: (registerRequest) => ({
                url: '/register',
                method: Http.POST,
                body: registerRequest
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError
        }),
        verifyAccount: builder.mutation<IResponse<void>, string>({
            query: (key) => ({
                url: `/verify/account?key=${key}`,
                method: Http.GET
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError
        }),
        verifyPassword: builder.mutation<IResponse<User>, string>({
            query: (key) => ({
                url: `/verify/password?key=${key}`,
                method: Http.GET
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        verifyQrCode: builder.mutation<IResponse<User>, QrCodeRequest>({
            query: (qrCodeRequest) => ({
                url: '/verify/qrcode',
                method: Http.POST,
                body: qrCodeRequest
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        resetPassword: builder.mutation<IResponse<void>, EmailAddress>({
            query: (email) => ({
                url: '/resetpassword',
                method: Http.POST,
                body: email
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        doResetPassword: builder.mutation<IResponse<void>, UpdateNewPassword>({
            query: (passwordrequest) => ({
                url: `/resetpassword/reset`,
                method: Http.POST,
                body: passwordrequest
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        updatePhoto: builder.mutation<IResponse<string>, FormData>({
            query: (form) => ({
                url: `/photo`,
                method: Http.PATCH,
                body: form
            }),
            transformResponse: processResponse<string>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        updateUser: builder.mutation<IResponse<User>, IUserRequest>({
            query: (user) => ({
                url: `/update`,
                method: Http.PATCH,
                body: user
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        updatePassword: builder.mutation<IResponse<void>, UpdatePassword>({
            query: (request) => ({
                url: `/updatepassword`,
                method: Http.PATCH,
                body: request
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        toggleAccountExpired: builder.mutation<IResponse<void>, void>({
            query: () => ({
                url: `/toggleaccountexpired`,
                method: Http.PATCH
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        toggleAccountLocked: builder.mutation<IResponse<void>, void>({
            query: () => ({
                url: `/toggleaccountlocked`,
                method: Http.PATCH
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        toggleAccountEnabled: builder.mutation<IResponse<void>, void>({
            query: () => ({
                url: `/toggleaccountenabled`,
                method: Http.PATCH
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        toggleCredentialsExpired: builder.mutation<IResponse<void>, void>({
            query: () => ({
                url: `/togglecredentialsexpired`,
                method: Http.PATCH
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        updateRole: builder.mutation<IResponse<void>, Role>({
            query: (role) => ({
                url: `/updaterole`,
                method: Http.PATCH,
                body: role
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        enableMfa: builder.mutation<IResponse<User>, void>({
            query: () => ({
                url: `/mfa/setup`,
                method: Http.PATCH
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        disableMfa: builder.mutation<IResponse<User>, void>({
            query: () => ({
                url: `/mfa/cancel`,
                method: Http.PATCH
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (error) => error ? [] : ['User']
        }),
        getUsers: builder.query<IResponse<Users>, void>({
            query: () => ({
                url: `/list`,
                method: Http.GET
            }),
            transformResponse: processResponse<Users>,
            transformErrorResponse: processError
        }),
        logout: builder.mutation<IResponse<void>, void>({
            query: () => ({
                url: `/logout`,
                method: Http.POST
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: () => ['User']
        }),
    }),
});