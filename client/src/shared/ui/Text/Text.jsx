import { memo } from 'react';
import cls from './Text.module.scss';
import { classNames } from '../../lib/classNames/classNames';

export const TextColor = {
	PRIMARY: 'primary',
	BG_COLOR: 'bg_color',
	ERROR: 'error',
	HINT_PRIMARY: 'hint_primary',
};

export const TextSize = {
	MEDIUM: 'medium',
	LARGE: 'large',
	EXTRA_LARGE: 'extra_large',
};

export const Text = memo((props) => {
	const {
		className,
		title,
		text,
		size = TextSize.MEDIUM,
		color = TextColor.PRIMARY,
	} = props;
	if (title !== '' && title !== null && title !== undefined) {
		return (
			<p
				className={classNames(cls.Title, {}, [
					className,
					cls[color],
					cls[size],
				])}
			>
				{title}
			</p>
		);
	} else {
		return (
			<p
				className={classNames(cls.Text, {}, [
					className,
					cls[color],
					cls[size],
				])}
			>
				{text}
			</p>
		);
	}
});
