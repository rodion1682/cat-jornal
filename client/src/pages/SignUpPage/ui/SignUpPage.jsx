import { memo, useRef, useState } from 'react';

import cls from './SignUpPage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Input } from '../../../shared/ui/Input/ui/Input';
import { USER_FIELDS } from '../../../shared/constants/userField';
import { Text, TextColor, TextSize } from '../../../shared/ui/Text/Text';
import {
	Button,
	ButtonAnimation,
	ButtonTheme,
	ButtonType,
} from '../../../shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from '../../../shared/ui/AppLink/AppLink';
import { paths } from '../../../app/router';
import { getFormInputs } from '../model/getFormInputs';
import { userAPI } from '../../../app/store/services/UserService';
import { signUpSumbit } from '../handlers/signUpSumbit';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const SignUpPage = memo(({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signUp] = userAPI.useSignUpMutation();
	const [signUpData, setSignUpData] = useState({
		[USER_FIELDS.NAME]: '',
		[USER_FIELDS.EMAIL]: '',
		[USER_FIELDS.PROFILE_PICTURE]: '',
		[USER_FIELDS.PASSWORD]: '',
	});

	const [apiError, setApiError] = useState(null);
	const [validationErrors, setValidationErrors] = useState({});

	const [previewImage, setPreviewImage] = useState(null);
	const fileInputRef = useRef(null);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = signUpSumbit({
		signUp,
		signUpData,
		setApiError,
		setIsSubmitting,
		setValidationErrors,
		navigate,
		dispatch,
	});

	const formInputs = getFormInputs({
		signUpData,
		validationErrors,
		setSignUpData,
		setValidationErrors,
		setPreviewImage,
		fileInputRef,
		previewImage,
	});

	return (
		<div
			className={classNames(cls.SignUpPage, {}, [className, '_container'])}
		>
			<form className={cls.SignUpPage__form} onSubmit={handleSubmit}>
				<Text
					className={cls.SignUpPage__title}
					title={apiError ? apiError : 'Sign up:'}
					size={TextSize.EXTRA_LARGE}
					color={apiError && TextColor.ERROR}
				/>
				{formInputs.map((input) => (
					<Input key={input.name} {...input} />
				))}
				<Button
					className={cls.SignUpPage__submit}
					type={ButtonType.SUBMIT}
					disabled={
						isSubmitting || Object.keys(validationErrors).length !== 0
					}
					theme={ButtonTheme.SUBMIT_BG_COLOR}
					animation={ButtonAnimation.SCALE}
				>
					<Text
						text={isSubmitting ? 'Signing up...' : 'Sign up'}
						color={TextColor.BG_COLOR}
						size={TextSize.LARGE}
					/>
				</Button>
			</form>
			<div className={cls.SignUpPage__text}>
				<Text text={'I already have'} />
				<AppLink
					className={cls.SignUpPage__link}
					theme={AppLinkTheme.TEXT_LINK}
					to={paths.logInPage}
				>
					account
				</AppLink>
			</div>
		</div>
	);
});
