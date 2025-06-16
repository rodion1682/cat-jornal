import { memo } from 'react';
import cls from './ItemPage.module.scss';
import { useParams } from 'react-router-dom';
import { getImageUrl } from '../../shared/helpers/getImageUrl';
import { ITEM_FIELDS } from '../../shared/constants/itemFields';
import { API_BASE_URL } from '../../shared/constants/apiEndpoints';
import { classNames } from '../../shared/lib/classNames/classNames';
import { getCategoryName } from '../../shared/helpers/getCategoryName';
import { PageNavigation } from '../../shared/ui/PageNavigation/PageNavigation';
import { Text, TextColor, TextSize } from '../../shared/ui/Text/Text';
import { getDate } from '../../shared/helpers/getDate';
import { UserLink } from '../../shared/ui/UserLink/UserLink';
import { useSelector } from 'react-redux';
import { itemAPI } from '../../app/store/services/ItemService';
import { paths } from '../../app/router';

export const ItemPage = memo(() => {
	const { id } = useParams();
	const { categories } = useSelector((state) => state.categories);
	const { data: item, isLoading, error } = itemAPI.useFetchItemByIdQuery(id);

	if (isLoading) return <div>Loading item...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className={cls.ItemPage}>
			<PageNavigation id={item[ITEM_FIELDS.ID]} />
			<div className={classNames(cls.ItemPage__inner, {}, ['_container'])}>
				<div className={classNames(cls.ItemPage__image, {}, ['_ibg'])}>
					<Text
						color={TextColor.BG_COLOR}
						className={cls.ItemPage__category}
						size={TextSize.LARGE}
						text={getCategoryName(
							categories,
							item[ITEM_FIELDS.CATEGORY_ID]
						)}
					/>
					<img
						src={getImageUrl(item[ITEM_FIELDS.IMAGE_PATH], API_BASE_URL)}
						alt={item[ITEM_FIELDS.TITLE]}
					/>
				</div>
				<div className={cls.ItemPage__top}>
					<div className={cls.ItemPage__title}>
						{item[ITEM_FIELDS.TITLE]}
					</div>
				</div>
				<div className={cls.ItemPage__box}>
					<div className={cls.ItemPage__about}>
						<UserLink
							to={paths.profilePage(item[ITEM_FIELDS.CREATED_BY])}
							image={item[ITEM_FIELDS.CREATORS_PICTURE]}
							name={item[ITEM_FIELDS.CREATORS_NAME]}
						/>
						<Text
							text={`Post added: ${getDate(
								item[ITEM_FIELDS.CREATED_AT]
							)}`}
						/>
					</div>
					<div className={cls.ItemPage__description}>
						{item[ITEM_FIELDS.DESCRIPTION]}
					</div>
				</div>
			</div>
		</div>
	);
});
