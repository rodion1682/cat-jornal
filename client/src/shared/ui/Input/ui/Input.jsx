import { memo, useState } from 'react';
import cls from './Input.module.scss';
import { classNames } from '../../../lib/classNames/classNames';
import { getImageUrl } from '../../../helpers/getImageUrl';
import { API_BASE_URL } from '../../../constants/apiEndpoints';
import { Text, TextColor, TextSize } from '../../Text/Text';
import { SvgIcon, SvgIconSizes } from '../../SvgIcon/SvgIcon';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as EyeIcon } from '../../../assets/icons/eye.svg';
import { ReactComponent as EyeSlashIcon } from '../../../assets/icons/eye-slash.svg';
import { Button, ButtonTheme } from '../../Button/Button';

export const InputTypes = {
	TEXT: 'text',
	FILE: 'file',
	TEXTAREA: 'textarea',
	PASSWORD: 'password',
};

export const InputSizes = {
	MAIN: 'main',
	LARGE: 'large',
};

export const Input = memo((props) => {
	const {
		className,
		label,
		placeholder,
		name,
		value,
		onChange,
		textarea,
		type = InputTypes.TEXT,
		previewImage,
		fileInputRef,
		searchInput,
		accept,
		errors,
		size = InputSizes.MAIN,
		...otherProps
	} = props;

	const hasLabel = label !== '' && label !== undefined && label !== null;

	const hasError = errors !== undefined && errors.length !== 0;

	const isPasswordType = type === InputTypes.PASSWORD;
	const [isFocused, setIsFocused] = useState(false);
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible((prev) => !prev);
	};

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);

	if (type === InputTypes.FILE) {
		return (
			<div className={classNames(cls.ImageInput, {}, [className])}>
				{hasLabel && <div className={cls.ImageInput__label}>{label}</div>}
				<input
					type={type}
					accept={accept}
					id={name}
					onChange={onChange}
					ref={fileInputRef}
					className={cls.ImageInput__input}
				/>
				<label htmlFor={name} className={cls.ImageInput__uploadText}>
					{previewImage ? (
						<div
							className={classNames(cls.ImageInput__imagePreview, {}, [
								'_ibg',
							])}
						>
							<img
								src={getImageUrl(previewImage, API_BASE_URL)}
								alt="Current item"
							/>
							<Text
								text={'Change Image'}
								size={TextSize.LARGE}
								className={cls.ImageInput__imageChange}
								color={TextColor.BG_COLOR}
							/>
						</div>
					) : (
						<div
							className={classNames(
								cls.ImageInput__uploadPlaceholder,
								{ [cls.error]: hasError },
								[]
							)}
						>
							<Text
								text={placeholder}
								size={TextSize.LARGE}
								className={cls.ImageInput__imageSelect}
							/>
						</div>
					)}
				</label>
				{errors &&
					errors.map((error) => (
						<Text
							key={error}
							className={cls.Input__text}
							text={error}
							color={TextColor.ERROR}
						/>
					))}
			</div>
		);
	}

	return (
		<div
			className={classNames(
				cls.Input,
				{
					[cls.SearchInput]: searchInput,
					[cls.SearchInput__focus]: isFocused,
					[cls.PasswordInput]: isPasswordType,
				},
				[className]
			)}
		>
			{hasLabel && (
				<label htmlFor={name} className={cls.Input__label}>
					{label}
				</label>
			)}
			<div className={cls.Input__inner}>
				{textarea ? (
					<textarea
						id={name}
						name={name}
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						className={classNames(
							cls.Input__textarea,
							{
								[cls.error]: hasError,
							},
							[cls.Input__default]
						)}
						{...otherProps}
					/>
				) : (
					<input
						id={name}
						name={name}
						placeholder={placeholder}
						type={
							isPasswordType
								? visible
									? InputTypes.TEXT
									: InputTypes.PASSWORD
								: type
						}
						value={value}
						onChange={onChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						className={classNames(
							cls.Input__input,
							{ [cls.error]: hasError },
							[cls.Input__default]
						)}
						{...otherProps}
					/>
				)}
				{searchInput && (
					<SvgIcon className={cls.Input__icon} size={SvgIconSizes.SMALL}>
						<SearchIcon />
					</SvgIcon>
				)}
				{type === InputTypes.PASSWORD && (
					<Button
						className={cls.Input__passwordToggle}
						onClick={toggleVisibility}
						theme={ButtonTheme.PASSWORD}
					>
						<SvgIcon
							className={cls.Input__icon}
							size={SvgIconSizes.SMALL}
						>
							{visible ? <EyeSlashIcon /> : <EyeIcon />}
						</SvgIcon>
					</Button>
				)}
				{errors &&
					errors.map((error) => (
						<Text
							key={error}
							className={cls.Input__text}
							text={error}
							color={TextColor.ERROR}
						/>
					))}
			</div>
		</div>
	);
});
