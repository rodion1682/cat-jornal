import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	filtredItems: [],
	searchQuery: '',
	selectedCategoryId: '',
};

const itemSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload;
			state.filtredItems = state.items;
		},
		setSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
			state.filtredItems = applayFilters(
				state.items,
				state.searchQuery,
				state.selectedCategoryId
			);
		},
		setCategoryFilter: (state, action) => {
			state.selectedCategoryId = action.payload;
			state.filtredItems = applayFilters(
				state.items,
				state.searchQuery,
				state.selectedCategoryId
			);
		},
		resetState: (state) => {
			state.searchQuery = '';
			state.selectedCategoryId = '';
			state.filtredItems = state.items;
		},
	},
});

const applayFilters = (items, searchQuery, selectedCategoryId) => {
	return items.filter((item) => {
		const titleMatch =
			!searchQuery.trim() ||
			item.title.toLowerCase().includes(searchQuery.toLowerCase());

		const categoryMatch =
			!selectedCategoryId || item.category_id === selectedCategoryId;
		return titleMatch && categoryMatch;
	});
};

export const { setItems, setCategoryFilter, setSearchQuery, resetState } =
	itemSlice.actions;
export default itemSlice.reducer;
