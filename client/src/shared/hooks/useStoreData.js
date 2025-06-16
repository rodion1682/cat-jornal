import { useItems } from './useItems';
import { useCategories } from './useCategories';

export const useStoreData = () => {
	const items = useItems();
	const categories = useCategories();

	return {
		...items,
		...categories,
		isLoading: items.itemsLoading || categories.categoriesLoading,
		error: items.itemsError || categories.categoriesError,
	};
};
