import { VALIDATION_TYPES } from '../../constants/validationTypes';

export const validator = (data, config) => {
	const errors = {};

	function validate(validateMethod, data, config) {
		let statusValidate;
		switch (validateMethod) {
			case VALIDATION_TYPES.REQUIRED: {
				if (typeof data === 'boolean') {
					statusValidate = !data;
				} else if (typeof data === 'string') {
					statusValidate = data.trim() === '';
				} else if (data instanceof File) {
					statusValidate = !data;
				}
				break;
			}
			case VALIDATION_TYPES.EMAIL: {
				const emailRegExp = /^\S+@\S+\.\S+$/g;
				statusValidate = !emailRegExp.test(data);
				break;
			}
			case VALIDATION_TYPES.HAS_CAPITAL: {
				const capitalRegExp = /[A-Z]+/g;
				statusValidate = !capitalRegExp.test(data);
				break;
			}
			case VALIDATION_TYPES.HAS_DIGIT: {
				const digitRegExp = /\d+/g;
				statusValidate = !digitRegExp.test(data);
				break;
			}
			case VALIDATION_TYPES.MIN_LENGTH: {
				statusValidate = data.length < config.value;
				break;
			}
			case VALIDATION_TYPES.IMAGE_TYPE: {
				if (data instanceof File) {
					const allowedTypes = ['image/jpeg', 'image/png'];
					statusValidate = !allowedTypes.includes(data.type);
				}
				break;
			}
			case VALIDATION_TYPES.IMAGE_SIZE: {
				if (data instanceof File) {
					const maxSizeInBytes = config.maxSizeMB * 1024 * 1024;
					statusValidate = data.size > maxSizeInBytes;
				}
				break;
			}
			default:
				break;
		}
		if (statusValidate) return config.message;
	}
	for (const fieldName in data) {
		for (const validateMethod in config[fieldName]) {
			const error = validate(
				validateMethod,
				data[fieldName],
				config[fieldName][validateMethod]
			);
			if (error) {
				if (!errors[fieldName]) {
					errors[fieldName] = [];
				}
				errors[fieldName].push(error);
			}
		}
	}
	return errors;
};
