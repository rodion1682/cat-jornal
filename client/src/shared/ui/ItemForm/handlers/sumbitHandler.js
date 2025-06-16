import { ITEM_FIELDS } from '../../../constants/itemFields';
import { paths } from '../../../../app/router';
import { formValidationConfig } from '../helpers/formValidationConfig';
import { validator } from '../../../helpers/validation/validator';

export const handleSubmit = (props) => async (e) => {
	e.preventDefault();

	const {
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
	} = props;

	const errors = validator(formData, formValidationConfig);
	setValidationErrors(errors);

	if (Object.keys(errors).length !== 0) {
		return null;
	}

	setIsSubmitting(true);

	try {
		const formDataToSend = new FormData();

		console.log('formData', formData);

		Object.entries(ITEM_FIELDS).forEach(([_, fieldName]) => {
			const value = formData[fieldName];

			if (value !== undefined && value !== null) {
				formDataToSend.append(fieldName, value);
			}
		});

		if (create) {
			await createItem(formDataToSend).unwrap();
			setFormData({
				[ITEM_FIELDS.TITLE]: '',
				[ITEM_FIELDS.DESCRIPTION]: '',
				[ITEM_FIELDS.CATEGORY_ID]: '',
				[ITEM_FIELDS.IMAGE]: null,
			});
		} else if (update) {
			await updateItem({
				formData: formDataToSend,
				id: initialData.id,
			}).unwrap();
		}

		navigate(paths.homePage);
	} catch (error) {
		console.error('Submission error:', error);
	} finally {
		setIsSubmitting(false);
	}
};
