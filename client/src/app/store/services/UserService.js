import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	API_BASE_URL,
	ENDPOINTS,
} from '../../../shared/constants/apiEndpoints';

export const userAPI = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
	tagTypes: ['User'],
	endpoints: (build) => ({
		signUp: build.mutation({
			query: (formData) => ({
				url: ENDPOINTS.USERS.SIGNUP,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['User'],
		}),
		logIn: build.mutation({
			query: (formData) => ({
				url: ENDPOINTS.USERS.LOGIN,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['User'],
		}),
		getUserById: build.query({
			query: (id) => ({
				url: ENDPOINTS.USERS.GET_USER_BY_ID(id),
			}),
			invalidatesTags: ['User'],
		}),
	}),
});
