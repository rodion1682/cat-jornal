import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { paths } from './index';

export const PrivateRoute = ({ children }) => {
	const currentUser = useSelector((state) => state.currentUser);

	if (!currentUser || !currentUser.email) {
		return <Navigate to={paths.logInPage} replace />;
	}

	return children;
};
