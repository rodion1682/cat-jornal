import { memo } from 'react';

import cls from './SvgIcon.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export const SvgIconSizes = {
	DEFAULT: 'default',
	SMALL: 'small',
	LOGO: 'logo',
	NAVBAR: 'navbar',
};

export const SvgIconTheme = {
	BACK: 'back',
	EDIT: 'edit',
	ADD: 'add',
	REVERSED_COLOR: 'reversed_color',
	NAVBAR: 'navbar',
	BG_COLOR: 'bg_color'
};

export const SvgIconPopupPosition = {
	TOP: 'top',
	LEFT: 'left',
	RIGHT: 'right',
};

export const SvgIcon = memo((props) => {
	const {
		children,
		className,
		size = SvgIconSizes.DEFAULT,
		popupPosition = SvgIconPopupPosition.TOP,
		popupText,
		theme = SvgIconTheme.BACK,
		active,
		open,
	} = props;

	return (
		<div
			className={classNames(
				cls.SvgIcon,
				{ [cls.open]: open, [cls.active]: active },
				[className, cls[size], cls[theme]]
			)}
		>
			{popupText !== '' && popupText !== null && popupText !== undefined ? (
				<span
					className={classNames(cls.SvgIcon__popup, {}, [
						cls[popupPosition],
					])}
				>
					{popupText}
				</span>
			) : null}
			{children}
		</div>
	);
});
