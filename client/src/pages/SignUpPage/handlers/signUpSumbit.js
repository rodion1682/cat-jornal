import { USER_FIELDS } from '../../../shared/constants/userField';
import { signUpValidation } from '../helpers/signUpValidation';
import { validator } from '../../../shared/helpers/validation/validator';
import { setCurrentUser } from '../../../app/store/slices/currentUserSlice';
import { paths } from '../../../app/router';

export const signUpSumbit = (props) => async (e) => {
	e.preventDefault();

	const {
		signUp,
		signUpData,
		setApiError,
		setIsSubmitting,
		setValidationErrors,
		dispatch,
		navigate,
	} = props;

	const errors = validator(signUpData, signUpValidation);
	setValidationErrors(errors);

	if (Object.keys(errors).length !== 0) {
		return null;
	}

	setIsSubmitting(true);

	try {
		const formDataToSend = new FormData();

		Object.entries(USER_FIELDS).forEach(([_, fieldName]) => {
			const value = signUpData[fieldName];

			if (value !== undefined && value !== null) {
				formDataToSend.append(fieldName, value);
			}
		});

		const response = await signUp(formDataToSend).unwrap();
		setApiError(null);
		dispatch(setCurrentUser(response));
		navigate(paths.userPostsPage);
	} catch (error) {
		setApiError(error.data);
	} finally {
		setIsSubmitting(false);
	}
};
