import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { itemAPI } from './services/ItemService';
import { categoriesAPI } from './services/CategoriesService';
import itemsReducer from './slices/itemSlice';
import currentUserReducer from './slices/currentUserSlice';
import categoriesReducer from './slices/categoriesSlice';
import { userAPI } from './services/UserService';

const rootReducer = combineReducers({
	[itemAPI.reducerPath]: itemAPI.reducer,
	[categoriesAPI.reducerPath]: categoriesAPI.reducer,
	[userAPI.reducerPath]: userAPI.reducer,
	items: itemsReducer,
	currentUser: currentUserReducer,
	categories: categoriesReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				itemAPI.middleware,
				categoriesAPI.middleware,
				userAPI.middleware
			),
	});
};
