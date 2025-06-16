import { memo } from 'react';
import cls from './Navbar.module.scss';
import { Logo } from '../../../shared/ui/Logo/Logo';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { useLocation } from 'react-router-dom';
import { paths } from '../../../app/router';
import { AppLink, AppLinkTheme } from '../../../shared/ui/AppLink/AppLink';
import {
	SvgIcon,
	SvgIconSizes,
	SvgIconTheme,
} from '../../../shared/ui/SvgIcon/SvgIcon';
import { ReactComponent as HomeIcon } from '../../../shared/assets/icons/home.svg';
import { ReactComponent as UserIcon } from '../../../shared/assets/icons/user.svg';
import { useSelector } from 'react-redux';
import { NavbarDropwdown } from '../NavbarDropwdown/NavbarDropwdown';
import { useBreakpoint } from '../../../shared/hooks/useBreakpoint';
import { BREAKPOINTS } from '../../../shared/constants/breakpoints';

export const Navbar = memo((props) => {
	const { className } = props;
	const isHidden = useBreakpoint(BREAKPOINTS.md2);
	const location = useLocation();
	const pathname = location.pathname;
	const currentUser = useSelector((state) => state.currentUser);

	return (
		<nav className={classNames(cls.Navbar, {}, [className])}>
			<div className={classNames(cls.Navbar__inner, {}, ['_container'])}>
				<Logo />
				<ul className={cls.Navbar__items}>
					{!isHidden && (
						<li className={cls.Navbar__item}>
							<AppLink
								className={cls.Navbar__link}
								active={pathname === paths.homePage}
								to={paths.homePage}
								theme={AppLinkTheme.NAVBAR}
							>
								<SvgIcon
									size={SvgIconSizes.NAVBAR}
									active={pathname === paths.homePage}
									theme={SvgIconTheme.NAVBAR}
								>
									<HomeIcon />
								</SvgIcon>
								Home Page
							</AppLink>
						</li>
					)}
					{!currentUser.name ? (
						<li className={cls.Navbar__item}>
							<AppLink
								className={cls.Navbar__link}
								active={pathname === paths.logInPage}
								to={paths.logInPage}
								theme={AppLinkTheme.NAVBAR}
							>
								<SvgIcon
									size={SvgIconSizes.NAVBAR}
									active={pathname === paths.logInPage}
									theme={SvgIconTheme.NAVBAR}
								>
									<UserIcon />
								</SvgIcon>
								Log in
							</AppLink>
						</li>
					) : (
						<NavbarDropwdown
							pathname={pathname}
							userName={currentUser.name}
							userPicture={currentUser.profile_picture}
						/>
					)}
				</ul>
			</div>
		</nav>
	);
});
