import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, isJsonContentType, processError, processResponse } from '../utils/requestutils';
import { IResponse } from '../models/IResponse';
import { User } from '../models/IUser';

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
        })
    }),
});