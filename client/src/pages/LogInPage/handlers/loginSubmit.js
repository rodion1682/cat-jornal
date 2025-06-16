import { USER_FIELDS } from '../../../shared/constants/userField';
import { validator } from '../../../shared/helpers/validation/validator';
import { logInValidation } from '../helpers/logInValidation';
import { setCurrentUser } from '../../../app/store/slices/currentUserSlice';
import { paths } from '../../../app/router';

export const loginSubmit = (props) => async (e) => {
	e.preventDefault();

	const {
		logIn,
		logInData,
		setApiError,
		setIsSubmitting,
		setValidationErrors,
		navigate,
		dispatch,
	} = props;

	const errors = validator(logInData, logInValidation);
	setValidationErrors(errors);

	if (Object.keys(errors).length !== 0) {
		return null;
	}

	setIsSubmitting(true);

	try {
		const formDataToSend = new FormData();

		Object.entries(USER_FIELDS).forEach(([_, fieldName]) => {
			const value = logInData[fieldName];

			if (value !== undefined && value !== null) {
				formDataToSend.append(fieldName, value);
			}
		});

		const response = await logIn(formDataToSend).unwrap();
		console.log('response', response);
		dispatch(setCurrentUser(response));

		setApiError(null);
		navigate(paths.userPostsPage);
	} catch (error) {
		setApiError(error.data);
	} finally {
		setIsSubmitting(false);
	}
};
