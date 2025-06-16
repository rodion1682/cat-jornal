import { Routes, Route } from 'react-router-dom';
import { routes } from './index';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
	return (
		<Routes>
			{routes.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					element={
						route.private ? (
							<PrivateRoute>
								<route.component />
							</PrivateRoute>
						) : (
							<route.component />
						)
					}
				/>
			))}
		</Routes>
	);
};
