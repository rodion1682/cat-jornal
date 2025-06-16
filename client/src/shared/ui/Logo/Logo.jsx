import { memo } from 'react';
import cls from './Logo.module.scss';
import { Link } from 'react-router-dom';
import { Text, TextColor, TextSize } from '../Text/Text';
import { SvgIcon, SvgIconSizes, SvgIconTheme } from '../SvgIcon/SvgIcon';
import { ReactComponent as LogoIcon } from '../../assets/logo/logo.svg';
import { classNames } from '../../lib/classNames/classNames';
import { paths } from '../../../app/router';

export const Logo = memo((props) => {
	const { className } = props;
	return (
		<Link
			className={classNames(cls.Logo, {}, [className])}
			to={paths.homePage}
		>
			<SvgIcon
				theme={SvgIconTheme.REVERSED_COLOR}
				className={cls.Logo__icon}
				size={SvgIconSizes.LOGO}
			>
				<LogoIcon />
			</SvgIcon>
			<Text
				size={TextSize.EXTRA_LARGE}
				color={TextColor.BG_COLOR}
				className={cls.Logo__text}
				title={'CB'}
			/>
		</Link>
	);
});
