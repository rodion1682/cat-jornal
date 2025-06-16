import { USER_FIELDS } from '../../../shared/constants/userField';
import {
	handleImageChange,
	handleInputChange,
} from '../../../shared/ui/Input/handlers/changeHandlers';
import { InputSizes, InputTypes } from '../../../shared/ui/Input/ui/Input';
import { signUpValidation } from '../helpers/signUpValidation';

export const getFormInputs = ({
	signUpData,
	validationErrors,
	setSignUpData,
	setValidationErrors,
	setPreviewImage,
	fileInputRef,
	previewImage,
}) => {
	return [
		{
			size: InputSizes.LARGE,
			type: InputTypes.TEXT,
			label: 'User name:',
			placeholder: 'Rodions Tropkins',
			name: USER_FIELDS.NAME,
			value: signUpData[USER_FIELDS.NAME],
			errors: validationErrors[USER_FIELDS.NAME],
			autoComplete: 'name',
			onChange: (e) =>
				handleInputChange(
					e,
					setSignUpData,
					validationErrors,
					setValidationErrors,
					signUpValidation
				),
		},
		{
			size: InputSizes.LARGE,
			type: InputTypes.TEXT,
			label: 'User email:',
			placeholder: 'rodion123@gmail.com',
			name: USER_FIELDS.EMAIL,
			value: signUpData[USER_FIELDS.EMAIL],
			errors: validationErrors[USER_FIELDS.EMAIL],
			autoComplete: 'email',
			onChange: (e) =>
				handleInputChange(
					e,
					setSignUpData,
					validationErrors,
					setValidationErrors,
					signUpValidation
				),
		},
		{
			size: InputSizes.LARGE,
			type: InputTypes.PASSWORD,
			label: 'User password:',
			placeholder: 'Enter user password',
			name: USER_FIELDS.PASSWORD,
			value: signUpData[USER_FIELDS.PASSWORD],
			errors: validationErrors[USER_FIELDS.PASSWORD],
			autoComplete: 'current-password',
			onChange: (e) =>
				handleInputChange(
					e,
					setSignUpData,
					validationErrors,
					setValidationErrors,
					signUpValidation
				),
		},
		{
			type: InputTypes.FILE,
			label: 'Profile picture:',
			placeholder: 'Select Image',
			name: USER_FIELDS.PROFILE_PICTURE,
			errors: validationErrors[USER_FIELDS.PROFILE_PICTURE],
			onChange: (e) =>
				handleImageChange(
					e,
					setSignUpData,
					setPreviewImage,
					validationErrors,
					setValidationErrors,
					USER_FIELDS.PROFILE_PICTURE,
					signUpValidation
				),
			accept: 'image/*',
			ref: fileInputRef,
			previewImage: previewImage,
		},
	];
};
