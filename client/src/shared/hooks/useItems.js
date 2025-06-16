import { itemAPI } from '../../app/store/services/ItemService';

export const useItems = () => {
	const {
		data: items,
		isLoading: itemsLoading,
		error: itemsError,
	} = itemAPI.useFetchAllItemsQuery('');

	return {
		items,
		itemsLoading,
		itemsError,
	};
};
