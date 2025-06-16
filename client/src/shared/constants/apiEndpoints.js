export const API_BASE_URL = '/api';

export const ENDPOINTS = {
	ITEMS: {
		ALL: `/index.php`,
		SINGLE: (id) => `/index.php?id=${id}`,
		CREATE: `/vendor/create.php`,
		UPDATE: (id) => `/vendor/update.php?id=${id}`,
		DELETE: (id) => `/vendor/delete.php?id=${id}`,
		GET_ITEMS_BY_USER_ID: (id) => `/api/get_items_by_user_id.php?id=${id}`,
	},
	CATEGORIES: {
		ALL: `/api/get_categories.php`,
	},
	USERS: {
		SIGNUP: 'actions/signup.php',
		LOGIN: 'actions/login.php',
		GET_USER_BY_ID: (id) => `/api/get_user_by_id.php?id=${id}`,
	},
};
