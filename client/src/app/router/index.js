import { HomePage } from '../../pages/HomePage/ui/HomePage';
import { CreateItemPage } from '../../pages/CreateItemPage/ui/CreateItemPage';
import { UpdateItemPage } from '../../pages/UpdateItemPage/ui/UpdateItemPage';
import { ItemPage } from '../../pages/ItemPage/ItemPage';
import { LogInPage } from '../../pages/LogInPage/ui/LogInPage';
import { SignUpPage } from '../../pages/SignUpPage/ui/SignUpPage';
import { UserPostsPage } from '../../pages/UserPostsPage/UserPostsPage';
import { ProfilePage } from '../../pages/ProfilePage/ui/ProfilePage';

export const paths = {
	homePage: '/',
	itemPage: (id) => `/itemPage/${id}`,
	profilePage: (id) => `/profilePage/${id}`,
	updateItemPage: (id) => `/update/${id}`,
	createItemPage: '/create',
	logInPage: '/login',
	signUpPage: '/signup',
	userPostsPage: '/userPostsPage',
};

export const routes = [
	{ path: paths.homePage, component: HomePage },
	{ path: paths.itemPage(':id'), component: ItemPage },
	{ path: paths.profilePage(':id'), component: ProfilePage, private: true },
	{ path: paths.logInPage, component: LogInPage },
	{ path: paths.signUpPage, component: SignUpPage },
	{ path: paths.userPostsPage, component: UserPostsPage, private: true },
	{
		path: paths.updateItemPage(':id'),
		component: UpdateItemPage,
		private: true,
	},
	{ path: paths.createItemPage, component: CreateItemPage, private: true },
];
