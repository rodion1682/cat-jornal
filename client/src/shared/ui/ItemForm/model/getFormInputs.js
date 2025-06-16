import { ITEM_FIELDS } from '../../../constants/itemFields';
import { classNames } from '../../../lib/classNames/classNames';
import {
	handleImageChange,
	handleInputChange,
} from '../../Input/handlers/changeHandlers';
import { InputTypes } from '../../Input/ui/Input';
import { handleCategoryChange } from '../../Select/handler/changeHandler';
import { formValidationConfig } from '../helpers/formValidationConfig';

export const TYPE_SELECT = 'select';
export const getFormInputs = ({
	formData,
	validationErrors,
	setFormData,
	setValidationErrors,
	setPreviewImage,
	fileInputRef,
	categories,
	previewImage,
}) => {
	return [
		{
			type: InputTypes.TEXT,
			label: 'Post Title',
			placeholder: 'Enter post title',
			name: ITEM_FIELDS.TITLE,
			value: formData[ITEM_FIELDS.TITLE],
			errors: validationErrors[ITEM_FIELDS.TITLE],
			onChange: (e) =>
				handleInputChange(
					e,
					setFormData,
					validationErrors,
					setValidationErrors,
					formValidationConfig
				),
		},
		{
			type: InputTypes.TEXTAREA,
			textarea: true,
			label: 'Post Description:',
			placeholder: 'Enter post description',
			name: ITEM_FIELDS.DESCRIPTION,
			value: formData[ITEM_FIELDS.DESCRIPTION],
			errors: validationErrors[ITEM_FIELDS.DESCRIPTION],
			onChange: (e) =>
				handleInputChange(
					e,
					setFormData,
					validationErrors,
					setValidationErrors,
					formValidationConfig
				),
		},
		{
			type: TYPE_SELECT,
			label: 'Post category:',
			placeholder: 'Select Post category',
			name: ITEM_FIELDS.CATEGORY_ID,
			value: formData[ITEM_FIELDS.CATEGORY_ID],
			errors: validationErrors[ITEM_FIELDS.CATEGORY_ID],
			options: categories,
			onChange: (e) =>
				handleCategoryChange(
					e,
					setFormData,
					validationErrors,
					setValidationErrors,
					formValidationConfig
				),
		},
		{
			type: InputTypes.FILE,
			label: 'Post image:',
			placeholder: 'Select Image',
			name: ITEM_FIELDS.IMAGE,
			errors: validationErrors[ITEM_FIELDS.IMAGE],
			onChange: (e) =>
				handleImageChange(
					e,
					setFormData,
					setPreviewImage,
					validationErrors,
					setValidationErrors,
					ITEM_FIELDS.IMAGE,
					formValidationConfig
				),
			accept: 'image/*',
			ref: fileInputRef,
			previewImage: previewImage,
		},
	];
};
