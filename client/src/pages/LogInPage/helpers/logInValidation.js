import { USER_FIELDS } from '../../../shared/constants/userField';
import { VALIDATION_TYPES } from '../../../shared/constants/validationTypes';

export const logInValidation = {
	[USER_FIELDS.EMAIL]: {
		[VALIDATION_TYPES.REQUIRED]: {
			message: 'The email is required',
		},
	},
	[USER_FIELDS.PASSWORD]: {
		[VALIDATION_TYPES.REQUIRED]: {
			message: 'The password is required',
		},
	},
};
