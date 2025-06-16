import { memo, useMemo } from 'react';
import { classNames } from '../../shared/lib/classNames/classNames';
import { ItemList } from '../../shared/ui/Items/ItemList/ItemList';
import { useSelector } from 'react-redux';
import { ITEM_FIELDS } from '../../shared/constants/itemFields';
import { PageNavigation } from '../../shared/ui/PageNavigation/PageNavigation';
import { itemAPI } from '../../app/store/services/ItemService';

export const UserPostsPage = memo((props) => {
	const { className } = props;
	const { data: items } = itemAPI.useFetchAllItemsQuery('');
	const currentUserId = useSelector((state) => state.currentUser.id);
	const userItems = useMemo(
		() =>
			items?.filter(
				(item) => item[ITEM_FIELDS.CREATED_BY] === currentUserId.toString()
			) || [],
		[items, currentUserId]
	);

	return (
		<div className={classNames('', {}, [className])}>
			<PageNavigation postCount={userItems.length} />
			<ItemList items={userItems} userPage={true} />
		</div>
	);
});
