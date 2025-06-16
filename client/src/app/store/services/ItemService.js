import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	API_BASE_URL,
	ENDPOINTS,
} from '../../../shared/constants/apiEndpoints';

export const itemAPI = createApi({
	reducerPath: 'itemAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
	tagTypes: ['Items'],
	endpoints: (build) => ({
		fetchAllItems: build.query({
			query: () => ({
				url: ENDPOINTS.ITEMS.ALL,
			}),
			providesTags: ['Items'],
		}),
		fetchItemById: build.query({
			query: (id) => ({
				url: ENDPOINTS.ITEMS.SINGLE(id),
			}),
			providesTags: ['Items'],
		}),
		getItemSByUserId: build.query({
			query: (id) => ({
				url: ENDPOINTS.ITEMS.GET_ITEMS_BY_USER_ID(id),
			}),
			providesTags: ['Items'],
		}),
		deleteItem: build.mutation({
			query: (id) => ({
				url: ENDPOINTS.ITEMS.DELETE(id),
				method: 'DELETE',
			}),
			invalidatesTags: ['Items'],
		}),
		updateItem: build.mutation({
			query: ({ formData, id }) => ({
				url: ENDPOINTS.ITEMS.UPDATE(id),
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Items'],
		}),
		createItem: build.mutation({
			query: (formData) => ({
				url: ENDPOINTS.ITEMS.CREATE,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Items'],
		}),
	}),
});
