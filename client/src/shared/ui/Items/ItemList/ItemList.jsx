import { memo } from 'react';
import cls from './ItemList.module.scss';
import { ItemCard } from '../ItemCard/ItemCard';
import { ITEM_FIELDS } from '../../../constants/itemFields';
import { getCategoryName } from '../../../helpers/getCategoryName';
import { useSelector } from 'react-redux';

export const ItemList = memo((props) => {
	const { userPage, items, profilePage } = props;

	const { categories } = useSelector((state) => state.categories);

	return (
		<div className={userPage || profilePage ? '' : cls.ItemList}>
			{items.map((item) => (
				<ItemCard
					userPage={userPage}
					profilePage={profilePage}
					key={item[ITEM_FIELDS.ID]}
					item={item}
					category={
						categories &&
						getCategoryName(categories, item[ITEM_FIELDS.CATEGORY_ID])
					}
				/>
			))}
		</div>
	);
});
