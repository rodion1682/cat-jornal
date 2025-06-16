import { ITEM_FIELDS } from '../../../constants/itemFields';
import { onChangeValidation } from '../../../helpers/validation/onChangeValidation';

export const handleCategoryChange = (
	e,
	setFormData,
	validationErrors,
	setValidationErrors,
	validatorConfig
) => {
	const value = e.target.value;

	setFormData((prev) => ({
		...prev,
		[ITEM_FIELDS.CATEGORY_ID]: value,
	}));

	onChangeValidation(
		validationErrors,
		setValidationErrors,
		value,
		ITEM_FIELDS.CATEGORY_ID,
		validatorConfig
	);
};
