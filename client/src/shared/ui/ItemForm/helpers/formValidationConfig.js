import { ITEM_FIELDS } from '../../../constants/itemFields';
import { VALIDATION_TYPES } from '../../../constants/validationTypes';

export const formValidationConfig = {
	[ITEM_FIELDS.TITLE]: {
		[VALIDATION_TYPES.REQUIRED]: {
			message: 'Title is required',
		},
	},
	[ITEM_FIELDS.DESCRIPTION]: {
		[VALIDATION_TYPES.REQUIRED]: {
			message: 'Description is required',
		},
	},
	[ITEM_FIELDS.CATEGORY_ID]: {
		[VALIDATION_TYPES.REQUIRED]: {
			message: 'Category is required',
		},
	},
	[ITEM_FIELDS.IMAGE]: {
		[VALIDATION_TYPES.REQUIRED]: {
			message: 'Image is required',
		},
	},
};
