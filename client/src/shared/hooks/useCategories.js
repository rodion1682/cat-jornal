import { categoriesAPI } from '../../app/store/services/CategoriesService';

export const useCategories = () => {
	const {
		data: categories,
		isLoading: categoriesLoading,
		error: categoriesError,
	} = categoriesAPI.useFetchAllCategoriesQuery('');

	return {
		categories,
		categoriesLoading,
		categoriesError,
	};
};
