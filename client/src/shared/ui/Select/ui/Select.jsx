import { memo, useCallback, useMemo, useRef, useState } from 'react';
import cls from './Select.module.scss';
import { _slideToggle, _slideUp } from '../../../lib/slideToggle/slideToggle';
import { useClickOutside } from '../../../lib/useClickOutside/useClickOutside';
import { classNames } from '../../../lib/classNames/classNames';
import { Button, ButtonTheme } from '../../Button/Button';
import { ITEM_FIELDS } from '../../../constants/itemFields';
import { getCategoryName } from '../../../helpers/getCategoryName';
import { Text, TextColor } from '../../Text/Text';

export const Select = memo((props) => {
	const { className, options, placeholder, onChange, value, label, errors } =
		props;
	const hasLabel = label !== '' && label !== null && label !== undefined;
	const hasValue = value !== null && value !== undefined && value !== '';
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const dropdownList = useRef(null);

	const filtredItems = useMemo(() => {
		if (options) {
			return options.filter((item) => item.id !== String(value));
		}
	}, [value, options]);

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

	const handleSelected = useCallback(
		(id) => {
			onChange({
				target: {
					value: id,
				},
			});
			onCloseDrowdown();
		},
		[onChange]
	);

	return (
		<>
			{hasLabel && <div className={cls.Select__label}>{label}</div>}
			<div
				ref={dropdownRef}
				className={classNames(cls.Select, {}, [className])}
			>
				<Button
					className={cls.Select__select}
					onClick={toggleDropdown}
					open={isOpen}
					theme={ButtonTheme.DROPDOWN}
					errors={errors}
				>
					<span>
						{hasValue ? getCategoryName(options, value) : placeholder}
					</span>
				</Button>
				<div ref={dropdownList} hidden className={cls.Select__dropdown}>
					{filtredItems?.map((item) => (
						<Button
							className={cls.Select__item}
							key={item.id}
							onClick={() => handleSelected(item.id)}
							theme={ButtonTheme.SELECT}
							value={item.id}
						>
							{item[ITEM_FIELDS.CATEGORY_NAME]}
						</Button>
					))}
				</div>
			</div>
			{errors &&
				errors.map((error) => (
					<Text
						key={error}
						className={cls.Select__text}
						text={error}
						color={TextColor.ERROR}
					/>
				))}
		</>
	);
});
