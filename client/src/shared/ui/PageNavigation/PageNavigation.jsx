import { memo } from 'react';
import cls from './PageNavigation.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { SvgIcon, SvgIconSizes, SvgIconTheme } from '../SvgIcon/SvgIcon';
import { Text, TextColor, TextSize } from '../Text/Text';
import { Button, ButtonAnimation, ButtonTheme } from '../Button/Button';
import { ReactComponent as BackwardIcon } from '../../assets/icons/back.svg';
import { ReactComponent as CreateIcon } from '../../assets/icons/add.svg';
import { useNavigate } from 'react-router-dom';
import { AppLink, AppLinkTheme } from '../AppLink/AppLink';
import { paths } from '../../../app/router';

export const PageNavigation = memo((props) => {
	const { className, id, postCount } = props;

	const hasPosts = postCount !== undefined;
	const titleConent = hasPosts
		? `You have ${postCount} posts`
		: `Page id: ${id}`;

	const navigate = useNavigate();
	const handleClick = () => {
		navigate(-1);
	};
	return (
		<div className={classNames(cls.PageNavigation, {}, [className])}>
			<div
				className={classNames(cls.PageNavigation__inner, {}, [
					'_container',
				])}
			>
				<Text
					className={cls.PageNavigation__title}
					title={titleConent}
					size={TextSize.LARGE}
				/>
				{hasPosts ? (
					<div className={cls.PageNavigation__action}>
						{hasPosts && (
							<AppLink
								className={cls.PageNavigation__link}
								theme={AppLinkTheme.ACTION}
								to={paths.createItemPage}
							>
								<SvgIcon
									theme={SvgIconTheme.REVERSED_COLOR}
									size={SvgIconSizes.NAVBAR}
								>
									<CreateIcon />
								</SvgIcon>
								<Text text={'Create post'} color={TextColor.BG_COLOR} />
							</AppLink>
						)}

						<Button
							className={classNames(
								cls.PageNavigation__button,
								{ [cls.PageNavigation__button_single]: !hasPosts },
								[]
							)}
							theme={ButtonTheme.SUBMIT}
							animation={ButtonAnimation.SCALE}
							onClick={handleClick}
						>
							<SvgIcon
								theme={SvgIconTheme.REVERSED_COLOR}
								size={SvgIconSizes.NAVBAR}
							>
								<BackwardIcon />
							</SvgIcon>
							<Text text={'Go back'} color={TextColor.BG_COLOR} />
						</Button>
					</div>
				) : (
					<Button
						className={classNames(
							cls.PageNavigation__button,
							{ [cls.PageNavigation__button_single]: !hasPosts },
							[]
						)}
						theme={ButtonTheme.SUBMIT}
						animation={ButtonAnimation.SCALE}
						onClick={handleClick}
					>
						<SvgIcon
							theme={SvgIconTheme.REVERSED_COLOR}
							size={SvgIconSizes.NAVBAR}
						>
							<BackwardIcon />
						</SvgIcon>
						<Text text={'Go back'} color={TextColor.BG_COLOR} />
					</Button>
				)}
			</div>
		</div>
	);
});
