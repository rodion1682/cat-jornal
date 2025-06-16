import { USER_FIELDS } from '../../../shared/constants/userField';
import { VALIDATION_TYPES } from '../../../shared/constants/validationTypes';

export const signUpValidation = {
	[USER_FIELDS.NAME]: {
		[VALIDATION_TYPES.REQUIRED]: {
			message: 'The name is required',
		},
		[VALIDATION_TYPES.MIN_LENGTH]: {
			message: 'The name must be at least 3 characters long',
			value: 3,
		},
	},
	[USER_FIELDS.EMAIL]: {
		[VALIDATION_TYPES.REQUIRED]: {
			message: 'The email is required',
		},
		[VALIDATION_TYPES.EMAIL]: {
			message: 'The email is invalid',
		},
	},
	[USER_FIELDS.PASSWORD]: {
		[VALIDATION_TYPES.REQUIRED]: {
			message: 'The password is required',
		},
		[VALIDATION_TYPES.HAS_CAPITAL]: {
			message: 'The password must contain at least one capital letter',
		},
		[VALIDATION_TYPES.HAS_DIGIT]: {
			message: 'The password must contain at least one digit',
		},
		[VALIDATION_TYPES.MIN_LENGTH]: {
			message: 'The password must be at least 8 characters long',
			value: 8,
		},
	},
	[USER_FIELDS.PROFILE_PICTURE]: {
		[VALIDATION_TYPES.REQUIRED]: {
			message: 'The profile picture is required',
		},
		[VALIDATION_TYPES.IMAGE_TYPE]: {
			message: 'Only JPG or PNG images are allowed',
		},
		[VALIDATION_TYPES.IMAGE_SIZE]: {
			message: 'Image must be smaller than 10MB',
			maxSizeMB: 10,
		},
	},
};
