import { memo } from 'react';
import cls from './ItemCard.module.scss';
import { API_BASE_URL } from '../../../constants/apiEndpoints';
import { ITEM_FIELDS } from '../../../constants/itemFields';
import { classNames } from '../../../lib/classNames/classNames';
import { Link } from 'react-router-dom';
import { paths } from '../../../../app/router';
import { Text, TextColor, TextSize } from '../../Text/Text';
import { getDate } from '../../../helpers/getDate';
import { AppLink, AppLinkTheme } from '../../AppLink/AppLink';
import { SvgIcon, SvgIconSizes, SvgIconTheme } from '../../SvgIcon/SvgIcon';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/trash.svg';
import { Button, ButtonTheme } from '../../Button/Button';
import { itemAPI } from '../../../../app/store/services/ItemService';
import { UserLink } from '../../UserLink/UserLink';

export const ItemCard = memo((props) => {
	const { item, category, userPage, profilePage } = props;
	const [deleteItem] = itemAPI.useDeleteItemMutation();

	const handleDelete = async (id) => {
		try {
			await deleteItem(id).unwrap();
		} catch (error) {
			console.log('error', error);
		}
	};

	if (userPage || profilePage) {
		return (
			<div className={classNames(cls.UserPageCard, {}, ['_container'])}>
				<Link
					to={paths.itemPage(item[[ITEM_FIELDS.ID]])}
					className={cls.UserPageCard__link}
				>
					<div
						className={classNames(cls.UserPageCard__image, {}, [
							'_ibg',
							'_bg-hover-overlay-scale',
						])}
					>
						<Text
							color={TextColor.BG_COLOR}
							className={cls.UserPageCard__category}
							text={category}
						/>
						<img
							src={`${API_BASE_URL}${item[ITEM_FIELDS.IMAGE_PATH]}`}
							alt={item[ITEM_FIELDS.TITLE]}
						/>
					</div>
				</Link>
				<div className={cls.UserPageCard__about}>
					<div className={cls.UserPageCard__inner}>
						<Link
							to={paths.itemPage(item[[ITEM_FIELDS.ID]])}
							className={cls.UserPageCard__title}
						>
							<Text
								size={TextSize.LARGE}
								color={TextColor.HINT_PRIMARY}
								title={item[ITEM_FIELDS.TITLE]}
							/>
						</Link>
						<Text
							className={cls.UserPageCard__description}
							text={item[ITEM_FIELDS.DESCRIPTION]}
						/>
					</div>
					<Text
						className={cls.UserPageCard__date}
						text={`Post add: ${getDate(item[ITEM_FIELDS.CREATED_AT])}`}
					/>
				</div>
				{!profilePage && userPage && (
					<div className={cls.UserPageCard__actions}>
						<AppLink
							to={paths.updateItemPage(item[ITEM_FIELDS.ID])}
							theme={AppLinkTheme.ACTION}
							className={cls.UserPageCard__button}
						>
							<SvgIcon
								theme={SvgIconTheme.REVERSED_COLOR}
								size={SvgIconSizes.NAVBAR}
							>
								<EditIcon />
							</SvgIcon>
							<Text text={'Edit post'} color={TextColor.BG_COLOR} />
						</AppLink>
						<Button
							className={cls.UserPageCard__button}
							theme={ButtonTheme.SUBMIT}
							onClick={() => handleDelete(item[ITEM_FIELDS.ID])}
						>
							<SvgIcon
								theme={SvgIconTheme.REVERSED_COLOR}
								size={SvgIconSizes.NAVBAR}
							>
								<DeleteIcon />
							</SvgIcon>
							<Text text={'Delete'} color={TextColor.BG_COLOR} />
						</Button>
					</div>
				)}
			</div>
		);
	} else {
		return (
			<div className={cls.ItemCard}>
				<div className={cls.ItemCard__inner}>
					<div className={cls.ItemCard__action}>
						<Link
							to={paths.itemPage(item[[ITEM_FIELDS.ID]])}
							className={cls.ItemCard__link}
						>
							<div
								className={classNames(cls.ItemCard__image, {}, [
									'_ibg',
									'_bg-hover-overlay-scale',
								])}
							>
								<Text
									color={TextColor.BG_COLOR}
									className={cls.ItemCard__category}
									text={category}
								/>
								<img
									src={`${API_BASE_URL}${
										item[ITEM_FIELDS.IMAGE_PATH]
									}`}
									alt={item[ITEM_FIELDS.TITLE]}
								/>
							</div>
							<Text
								className={cls.ItemCard__title}
								size={TextSize.LARGE}
								color={TextColor.HINT_PRIMARY}
								title={item[ITEM_FIELDS.TITLE]}
							/>
						</Link>
					</div>
					<div className={cls.ItemCard__about}>
						<UserLink
							to={paths.profilePage(item[ITEM_FIELDS.CREATED_BY])}
							image={item[ITEM_FIELDS.CREATORS_PICTURE]}
							name={item[ITEM_FIELDS.CREATORS_NAME]}
						/>
						<Text
							className={cls.ItemCard__date}
							text={getDate(item[ITEM_FIELDS.CREATED_AT])}
						/>
					</div>
				</div>
			</div>
		);
	}
});
