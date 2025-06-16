import { memo } from 'react';
import cls from './Button.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { SvgIcon, SvgIconSizes } from '../SvgIcon/SvgIcon';
import { ReactComponent as IconChevrone } from '../../assets/icons/chevrone.svg';

export const ButtonTheme = {
	SELECT: 'select',
	DROPDOWN: 'dropdown',
	SUBMIT: 'submit',
	SUBMIT_BG_COLOR: 'submitBgColor',
	PASSWORD: 'password',
	NAVBAR: 'navbar',
};

export const ButtonAnimation = {
	SCALE: 'scale',
};

export const ButtonType = {
	BUTTON: 'button',
	SUBMIT: 'submit',
};

export const Button = memo((props) => {
	const {
		className,
		children,
		onClick,
		theme,
		open,
		errors,
		disabled,
		animation = ButtonAnimation.SCALE,
		type = ButtonType.BUTTON,
	} = props;

	const mods = {
		[cls.dropdown_open]: open,
		[cls.error]: errors,
		[cls.disabled]: disabled,
	};

	return (
		<button
			type={type}
			onClick={onClick}
			className={classNames(cls.Button, mods, [
				className,
				cls[theme],
				cls[animation],
			])}
			disabled={disabled}
		>
			{children}
			{theme === ButtonTheme.DROPDOWN && (
				<SvgIcon className={cls.dropdown__icon} size={SvgIconSizes.SMALL}>
					<IconChevrone />
				</SvgIcon>
			)}
		</button>
	);
});
