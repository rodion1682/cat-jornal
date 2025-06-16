import { memo, useCallback, useRef, useState } from 'react';
import cls from './NavbarDropwdown.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';
import {
	SvgIcon,
	SvgIconSizes,
	SvgIconTheme,
} from '../../../shared/ui/SvgIcon/SvgIcon';
import { paths } from '../../../app/router';
import { AppLink, AppLinkTheme } from '../../../shared/ui/AppLink/AppLink';
import { ReactComponent as IconChevrone } from '../../../shared/assets/icons/chevrone.svg';
import { ReactComponent as LogoutIcon } from '../../../shared/assets/icons/logout.svg';
import { ReactComponent as PostIcon } from '../../../shared/assets/icons/posts.svg';
import { ReactComponent as AddItemIcon } from '../../../shared/assets/icons/add.svg';
import {
	_slideToggle,
	_slideUp,
} from '../../../shared/lib/slideToggle/slideToggle';
import { useClickOutside } from '../../../shared/lib/useClickOutside/useClickOutside';
import { useDispatch } from 'react-redux';
import { resetCurrentUser } from '../../../app/store/slices/currentUserSlice';
import { useBreakpoint } from '../../../shared/hooks/useBreakpoint';
import { BREAKPOINTS } from '../../../shared/constants/breakpoints';
import { ReactComponent as HomeIcon } from '../../../shared/assets/icons/home.svg';

export const NavbarDropwdown = memo((props) => {
	const { userName, userPicture, pathname } = props;
	const isVisibale = useBreakpoint(BREAKPOINTS.md2);

	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const dropdownList = useRef(null);

	const toggleDropdown = useCallback(() => {
		_slideToggle(dropdownList.current);
		setIsOpen((prev) => !prev);
	}, []);
	const onCloseDrowdown = useCallback(() => {
		_slideUp(dropdownList.current);
		setIsOpen(false);
	}, []);

	useClickOutside({
		target: dropdownRef.current,
		isOpen: isOpen,
		onClose: onCloseDrowdown,
	});

	const handleLogOut = useCallback(() => {
		onCloseDrowdown();
		dispatch(resetCurrentUser());
	}, [dispatch, onCloseDrowdown]);

	return (
		<li className={cls.NavbarDropwdown__item_dropdown} ref={dropdownRef}>
			<Button
				className={cls.NavbarDropwdown__link}
				theme={ButtonTheme.NAVBAR}
				onClick={toggleDropdown}
			>
				<div
					className={classNames(cls.NavbarDropwdown__image, {}, ['_ibg'])}
				>
					<img src={userPicture} alt={userName} />
				</div>
				{userName}
				<SvgIcon
					open={isOpen}
					theme={SvgIconTheme.REVERSED_COLOR}
					size={SvgIconSizes.NAVBAR}
				>
					<IconChevrone />
				</SvgIcon>
			</Button>
			<ul className={cls.Dropdown} ref={dropdownList} hidden>
				{isVisibale && (
					<li onClick={() => onCloseDrowdown()}>
						<AppLink
							className={cls.NavbarDropwdown__link}
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
				<li onClick={() => onCloseDrowdown()}>
					<AppLink
						className={cls.NavbarDropwdown__link}
						active={pathname === paths.userPostsPage}
						to={paths.userPostsPage}
						theme={AppLinkTheme.NAVBAR}
					>
						<SvgIcon
							size={SvgIconSizes.NAVBAR}
							active={pathname === paths.userPostsPage}
							theme={SvgIconTheme.NAVBAR}
						>
							<PostIcon />
						</SvgIcon>
						My posts
					</AppLink>
				</li>
				<li onClick={() => onCloseDrowdown()}>
					<AppLink
						className={cls.NavbarDropwdown__link}
						active={pathname === paths.createItemPage}
						to={paths.createItemPage}
						theme={AppLinkTheme.NAVBAR}
					>
						<SvgIcon
							size={SvgIconSizes.NAVBAR}
							active={pathname === paths.createItemPage}
							theme={SvgIconTheme.NAVBAR}
						>
							<AddItemIcon />
						</SvgIcon>
						Create Post
					</AppLink>
				</li>
				<li>
					<Button
						className={cls.NavbarDropwdown__link}
						theme={ButtonTheme.NAVBAR}
						onClick={handleLogOut}
					>
						<SvgIcon
							size={SvgIconSizes.NAVBAR}
							active={pathname === paths.logInPage}
							theme={SvgIconTheme.NAVBAR}
						>
							<LogoutIcon />
						</SvgIcon>
						Log out
					</Button>
				</li>
			</ul>
		</li>
	);
});
