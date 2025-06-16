import { validator } from './validator';

export const onChangeValidation = (
	validationErrors,
	setValidationErrors,
	value,
	name,
	validatorConfig
) => {
	if (validationErrors[name]) {
		const errors = validator(
			{ [name]: value },
			{ [name]: validatorConfig[name] }
		);
		if (errors[name]) {
			setValidationErrors((prev) => ({ ...prev, [name]: errors[name] }));
		} else if (errors[name] === undefined) {
			setValidationErrors((prev) => {
				const { [name]: _, ...rest } = prev;
				return rest;
			});
		}
	}
};
