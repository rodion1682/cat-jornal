import { ITEM_FIELDS } from '../../../constants/itemFields';
import { onChangeValidation } from '../../../helpers/validation/onChangeValidation';

export const handleInputChange = (
	e,
	setFormData,
	validationErrors,
	setValidationErrors,
	validatorConfig
) => {
	const { name, value } = e.target;

	setFormData((prev) => ({ ...prev, [name]: value }));

	onChangeValidation(
		validationErrors,
		setValidationErrors,
		value,
		name,
		validatorConfig
	);
};

export const handleImageChange = (
	e,
	setFormData,
	setPreviewImage,
	validationErrors,
	setValidationErrors,
	name,
	validatorConfig
) => {
	const file = e.target.files[0];

	if (!file) return Promise.resolve(null);

	setFormData((prev) => ({
		...prev,
		[name]: file,
	}));

	onChangeValidation(
		validationErrors,
		setValidationErrors,
		file,
		name,
		validatorConfig
	);

	return new Promise((resolve) => {
		const reader = new FileReader();

		setPreviewImage((prev) => {
			if (prev && prev.startsWith('blob:')) {
				URL.revokeObjectURL(prev);
			}
			return null;
		});

		reader.onloadend = () => {
			const previewUrl = reader.result;
			setPreviewImage(previewUrl);
			resolve(previewUrl);
		};

		reader.onerror = () => {
			console.error('File reading failed');
			resolve(null);
		};

		reader.readAsDataURL(file);
	});
};
