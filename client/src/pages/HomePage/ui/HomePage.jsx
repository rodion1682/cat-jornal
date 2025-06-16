import { memo, useEffect } from 'react';
import cls from './HomePage.module.scss';
import { ItemList } from '../../../shared/ui/Items/ItemList/ItemList';
import { Filterbar } from '../../../widget/Filterbar/Filterbar';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../../app/store/slices/itemSlice';
import { itemAPI } from '../../../app/store/services/ItemService';

export const HomePage = memo(() => {
	const dispatch = useDispatch();
	const { data: items, isLoading, error } = itemAPI.useFetchAllItemsQuery('');
	const { filtredItems } = useSelector((state) => state.items);

	useEffect(() => {
		if (items) {
			dispatch(setItems(items));
		}
	}, [dispatch, isLoading, items]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className={cls.HomePage}>
			<Filterbar />
			<ItemList items={filtredItems} />
		</div>
	);
});
