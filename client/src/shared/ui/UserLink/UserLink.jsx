import { memo } from 'react';

import cls from './UserLink.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { AppLink } from '../AppLink/AppLink';
import { Text } from '../Text/Text';

export const UserLink = memo((props) => {
	const { className, image, name, to } = props;
	return (
		<AppLink className={classNames(cls.UserLink, {}, [className])} to={to}>
			<div className={classNames(cls.UserLink__image, {}, ['_ibg'])}>
				<img src={image} alt={name} />
			</div>
			<Text className={cls.UserLink__name} text={name} />
		</AppLink>
	);
});
