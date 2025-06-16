import './styles/style.scss';
import { AppRouter } from './router/AppRouter';
import { Navbar } from '../widget/Navbar/ui/Navbar';
import { categoriesAPI } from './store/services/CategoriesService';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories } from './store/slices/categoriesSlice';

export default function App() {
	const dispatch = useDispatch();
	const { data: categories, isLoading } =
		categoriesAPI.useFetchAllCategoriesQuery('');

	useEffect(() => {
		if (!isLoading) {
			dispatch(setCategories(categories));
		}
	}, [isLoading, categories, dispatch]);

	return (
		<div className="app">
			<Navbar />
			<AppRouter />
		</div>
	);
}
