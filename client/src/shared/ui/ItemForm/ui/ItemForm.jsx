import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './ItemForm.module.scss';
import { itemAPI } from '../../../../app/store/services/ItemService';
import { ITEM_FIELDS } from '../../../constants/itemFields';
import { Input, InputTypes } from '../../Input/ui/Input';
import { categoriesAPI } from '../../../../app/store/services/CategoriesService';
import { classNames } from '../../../lib/classNames/classNames';
import {
	Button,
	ButtonAnimation,
	ButtonTheme,
	ButtonType,
} from '../../Button/Button';
import { Text, TextColor, TextSize } from '../../Text/Text';
import { handleSubmit } from '../handlers/sumbitHandler';
import { getFormInputs, TYPE_SELECT } from '../model/getFormInputs';
import { Select } from '../../Select/ui/Select';
import { useSelector } from 'react-redux';

export const ItemForm = memo(({ initialData, update, create }) => {
	const { data: categories, isLoading } =
		categoriesAPI.useFetchAllCategoriesQuery('');
	const {
		id: userId,
		name: userName,
		profile_picture: userPicture,
	} = useSelector((state) => state.currentUser);
	const [updateItem] = itemAPI.useUpdateItemMutation();
	const [createItem] = itemAPI.useCreateItemMutation();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		[ITEM_FIELDS.TITLE]: initialData?.[ITEM_FIELDS.TITLE] || '',
		[ITEM_FIELDS.DESCRIPTION]: initialData?.[ITEM_FIELDS.DESCRIPTION] || '',
		[ITEM_FIELDS.IMAGE]: initialData?.[ITEM_FIELDS.IMAGE] || '',
		[ITEM_FIELDS.CATEGORY_ID]: initialData?.[ITEM_FIELDS.CATEGORY_ID] || '',
		[ITEM_FIELDS.CREATED_BY]: userId,
		[ITEM_FIELDS.CREATORS_NAME]: userName,
		[ITEM_FIELDS.CREATORS_PICTURE]: userPicture,
	});

	const [validationErrors, setValidationErrors] = useState({});

	const [previewImage, setPreviewImage] = useState(
		initialData?.[ITEM_FIELDS.IMAGE_PATH] || null
	);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const fileInputRef = useRef(null);

	useEffect(() => {
		if (initialData?.[ITEM_FIELDS.IMAGE_PATH]) {
			setPreviewImage(initialData[ITEM_FIELDS.IMAGE_PATH]);
			setFormData((prev) => ({
				...prev,
				[ITEM_FIELDS.IMAGE]: initialData[ITEM_FIELDS.IMAGE_PATH],
			}));
		}
	}, [initialData]);

	const onSubmit = handleSubmit({
		formData,
		setIsSubmitting,
		setFormData,
		setValidationErrors,
		create,
		update,
		createItem,
		updateItem,
		initialData,
		navigate,
	});

	const formInputs = getFormInputs({
		formData,
		validationErrors,
		setFormData,
		setValidationErrors,
		setPreviewImage,
		fileInputRef,
		categories,
		previewImage,
	});

	return (
		<form
			className={classNames(cls.ItemForm, {}, ['_container'])}
			onSubmit={(e) => onSubmit(e)}
		>
			<div className={cls.ItemForm__body}>
				<div className={cls.ItemForm__inputs}>
					{formInputs.map((input) => {
						if (input.type === InputTypes.FILE) {
							return null;
						} else if (input.type === TYPE_SELECT) {
							if (isLoading) {
								return (
									<div key={`select-loading-${input.name}`}>
										Loading...
									</div>
								);
							} else {
								return <Select key={input.name} {...input} />;
							}
						} else {
							return <Input key={input.name} {...input} />;
						}
					})}
				</div>

				{formInputs.map((input) => {
					if (input.type !== InputTypes.FILE) return null;
					return <Input key={input.name} {...input} />;
				})}
			</div>
			<Button
				className={cls.ItemForm__submit}
				type={ButtonType.SUBMIT}
				disabled={
					isSubmitting || Object.keys(validationErrors).length !== 0
				}
				theme={ButtonTheme.SUBMIT}
				animation={ButtonAnimation.SCALE}
			>
				<Text
					text={
						isSubmitting
							? create
								? 'Adding post...'
								: 'Saving changes...'
							: create
							? 'Add post'
							: 'Save changes'
					}
					color={TextColor.BG_COLOR}
					size={TextSize.LARGE}
				/>
			</Button>
		</form>
	);
});
