import { memo } from 'react';
import cls from './AppLink.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { Link } from 'react-router-dom';

export const AppLinkTheme = {
	WHITE_TO_HINT: 'white_to_hint',
	NAVBAR: 'navbar',
	TEXT_LINK: 'text_link',
	ACTION: 'action',
};

export const AppLink = memo((props) => {
	const {
		className,
		to,
		children,
		active,
		theme = AppLinkTheme.PRIMARY_TO_HINT,
	} = props;
	return (
		<Link
			to={to}
			className={classNames(cls.AppLink, { [cls.active]: active }, [
				className,
				cls[theme],
			])}
		>
			{children}
		</Link>
	);
});
