import { memo } from 'react';

import cls from './ProfilePage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { userAPI } from '../../../app/store/services/UserService';
import { ITEM_FIELDS } from '../../../shared/constants/itemFields';
import { USER_FIELDS } from '../../../shared/constants/userField';
import { Text, TextSize } from '../../../shared/ui/Text/Text';
import { getImageUrl } from '../../../shared/helpers/getImageUrl';
import { API_BASE_URL } from '../../../shared/constants/apiEndpoints';
import { itemAPI } from '../../../app/store/services/ItemService';
import { ItemList } from '../../../shared/ui/Items/ItemList/ItemList';

export const ProfilePage = memo((props) => {
	const { className } = props;
	const { id } = useParams();
	const { data: user, isLoading, error } = userAPI.useGetUserByIdQuery(id);
	const {
		data: items,
		isLoading: isItemsLoading,
		error: itemsError,
	} = itemAPI.useGetItemSByUserIdQuery(id);

	if (isLoading || isItemsLoading) return <div>Loading user...</div>;
	if (error || itemsError) return <div>Error: {error || itemsError.data}</div>;

	return (
		<div
			className={classNames(cls.ProfilePage, {}, [className, '_container'])}
		>
			<div className={cls.ProfilePage__top}>
				<div className={classNames(cls.ProfilePage__image, {}, ['_ibg'])}>
					<img
						src={getImageUrl(
							user[USER_FIELDS.PROFILE_PICTURE],
							API_BASE_URL
						)}
						alt={user[USER_FIELDS.NAME]}
					/>
				</div>
				<div className={cls.ProfilePage__about}>
					<Text
						size={TextSize.LARGE}
						text={`User name: ${user[USER_FIELDS.NAME]}`}
					/>
					<Text
						size={TextSize.LARGE}
						text={`User email: ${user[USER_FIELDS.EMAIL]}`}
					/>
					<Text
						size={TextSize.LARGE}
						text={`${user[USER_FIELDS.NAME]} has ${items.length} post`}
					/>
				</div>
			</div>
			<ItemList items={items} profilePage={true} />
		</div>
	);
});
