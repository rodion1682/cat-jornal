import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	API_BASE_URL,
	ENDPOINTS,
} from '../../../shared/constants/apiEndpoints';

export const categoriesAPI = createApi({
	reducerPath: 'categoriesAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
	tagTypes: ['Categories'],
	endpoints: (build) => ({
		fetchAllCategories: build.query({
			query: () => ({
				url: ENDPOINTS.CATEGORIES.ALL,
			}),
			providesTags: ['Categories'],
		}),
	}),
});
