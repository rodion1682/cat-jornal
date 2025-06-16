import { memo, useCallback, useState } from 'react';
import cls from './Filterbar.module.scss';
import { classNames } from '../../shared/lib/classNames/classNames';
import { Input } from '../../shared/ui/Input/ui/Input';

import { Text, TextColor, TextSize } from '../../shared/ui/Text/Text';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import {
	setSearchQuery,
	setCategoryFilter,
	resetState,
} from '../../app/store/slices/itemSlice';
import { Button, ButtonTheme } from '../../shared/ui/Button/Button';
import { Select } from '../../shared/ui/Select/ui/Select';
import { useBreakpoint } from '../../shared/hooks/useBreakpoint';
import { BREAKPOINTS } from '../../shared/constants/breakpoints';

export const Filterbar = memo((props) => {
	const { className } = props;
	const isHidden = useBreakpoint(BREAKPOINTS.md2);
	const [searchValue, setSearchValue] = useState('');
	const [categoryValue, setCategoryValue] = useState('');
	const { categories } = useSelector((state) => state.categories);
	const { filtredItems } = useSelector((state) => state.items);

	const dispatch = useDispatch();

	const filterUsers = useDebounce((value) => {
		dispatch(setSearchQuery(value));
	}, 500);

	const handleCategoryChange = useCallback(
		(e) => {
			const value = e.target.value;
			setCategoryValue(value);
			dispatch(setCategoryFilter(value));
		},
		[dispatch]
	);

	const handleInputChange = useCallback(
		(e) => {
			const value = e.target.value;
			setSearchValue(value);
			filterUsers(value);
		},
		[filterUsers]
	);

	const handleValuesReste = (e) => {
		e.preventDefault();
		setSearchValue('');
		setCategoryValue('');
		dispatch(resetState());
	};

	return (
		<div className={classNames(cls.Filterbar, {}, [className])}>
			<div className={classNames(cls.Filterbar__inner, {}, ['_container'])}>
				<div className={cls.Filterbar__actions}>
					<Input
						className={cls.Filterbar__input}
						value={searchValue}
						onChange={handleInputChange}
						placeholder={'Search posts by title'}
						searchInput={true}
					/>
					<Select
						className={cls.Filterbar__select}
						options={categories}
						value={categoryValue}
						onChange={handleCategoryChange}
						placeholder={'Sort posts by category'}
					/>
					<Button
						className={cls.Filterbar__button}
						theme={ButtonTheme.SUBMIT}
						onClick={(e) => handleValuesReste(e)}
					>
						<Text text={'Reste'} color={TextColor.BG_COLOR} />
					</Button>
				</div>
				{!isHidden && (
					<Text
						size={TextSize.LARGE}
						text={`Found ${filtredItems.length} posts`}
					/>
				)}
			</div>
		</div>
	);
});
