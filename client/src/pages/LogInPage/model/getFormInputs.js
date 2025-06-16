import { USER_FIELDS } from '../../../shared/constants/userField';
import { handleInputChange } from '../../../shared/ui/Input/handlers/changeHandlers';
import { InputSizes, InputTypes } from '../../../shared/ui/Input/ui/Input';
import { logInValidation } from '../helpers/logInValidation';

export const getFormInputs = ({
	logInData,
	validationErrors,
	setLogInData,
	setValidationErrors,
}) => {
	return [
		{
			size: InputSizes.LARGE,
			type: InputTypes.TEXT,
			label: 'User email',
			placeholder: 'rodion123@gmail.com',
			name: USER_FIELDS.EMAIL,
			value: logInData[USER_FIELDS.EMAIL],
			errors: validationErrors[USER_FIELDS.EMAIL],
			autoComplete: 'username',
			onChange: (e) =>
				handleInputChange(
					e,
					setLogInData,
					validationErrors,
					setValidationErrors,
					logInValidation
				),
		},
		{
			size: InputSizes.LARGE,
			type: InputTypes.PASSWORD,
			label: 'User password:',
			placeholder: 'Enter user password',
			name: USER_FIELDS.PASSWORD,
			value: logInData[USER_FIELDS.PASSWORD],
			errors: validationErrors[USER_FIELDS.PASSWORD],
			autoComplete: 'current-password',
			onChange: (e) =>
				handleInputChange(
					e,
					setLogInData,
					validationErrors,
					setValidationErrors,
					logInValidation
				),
		},
	];
};
