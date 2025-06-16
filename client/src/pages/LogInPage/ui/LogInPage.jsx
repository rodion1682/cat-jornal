import { memo, useState } from 'react';
import cls from './LogInPage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Input } from '../../../shared/ui/Input/ui/Input';
import { USER_FIELDS } from '../../../shared/constants/userField';
import {
	Button,
	ButtonAnimation,
	ButtonTheme,
	ButtonType,
} from '../../../shared/ui/Button/Button';
import { Text, TextColor, TextSize } from '../../../shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from '../../../shared/ui/AppLink/AppLink';
import { paths } from '../../../app/router';
import { getFormInputs } from '../model/getFormInputs';
import { userAPI } from '../../../app/store/services/UserService';
import { useNavigate } from 'react-router-dom';
import { loginSubmit } from '../handlers/loginSubmit';
import { useDispatch } from 'react-redux';

export const LogInPage = memo(() => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [logIn] = userAPI.useLogInMutation();
	const [logInData, setLogInData] = useState({
		[USER_FIELDS.EMAIL]: '',
		[USER_FIELDS.PASSWORD]: '',
	});

	const [apiError, setApiError] = useState(null);
	const [validationErrors, setValidationErrors] = useState({});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = loginSubmit({
		logIn,
		logInData,
		setApiError,
		setIsSubmitting,
		setValidationErrors,
		navigate,
		dispatch,
	});

	const formInputs = getFormInputs({
		logInData,
		validationErrors,
		setLogInData,
		setValidationErrors,
	});

	return (
		<div className={classNames(cls.LogInPage, {}, ['_container'])}>
			<form className={cls.LogInPage__form} onSubmit={handleSubmit}>
				<Text
					className={cls.LogInPage__title}
					title={apiError ? apiError : 'Log in:'}
					size={TextSize.EXTRA_LARGE}
					color={apiError && TextColor.ERROR}
				/>
				{formInputs.map((input) => (
					<Input key={input.name} {...input} />
				))}
				<Button
					className={cls.LogInPage__submit}
					type={ButtonType.SUBMIT}
					disabled={
						isSubmitting || Object.keys(validationErrors).length !== 0
					}
					theme={ButtonTheme.SUBMIT_BG_COLOR}
					animation={ButtonAnimation.SCALE}
				>
					<Text
						text={isSubmitting ? 'Logging in...' : 'Log in'}
						color={TextColor.BG_COLOR}
						size={TextSize.LARGE}
					/>
				</Button>
			</form>
			<div className={cls.LogInPage__text}>
				<Text text={"I don't have"} />
				<AppLink
					className={cls.LogInPage__link}
					theme={AppLinkTheme.TEXT_LINK}
					to={paths.signUpPage}
				>
					account
				</AppLink>
			</div>
		</div>
	);
});
