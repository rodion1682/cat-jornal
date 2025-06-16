import { createSlice } from '@reduxjs/toolkit';
import { getImageUrl } from '../../../shared/helpers/getImageUrl';
import { API_BASE_URL } from '../../../shared/constants/apiEndpoints';

const savedUser = JSON.parse(localStorage.getItem('currentUser'));

const initialState = savedUser ?? {
	id: '',
	name: '',
	email: '',
	profile_picture: '',
};

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			console.log('action.payload', action.payload);

			state.id = action.payload.id;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.profile_picture = getImageUrl(
				action.payload.profile_picture,
				API_BASE_URL
			);

			localStorage.setItem(
				'currentUser',
				JSON.stringify({
					id: state.id,
					name: state.name,
					email: state.email,
					profile_picture: state.profile_picture,
				})
			);
		},
		resetCurrentUser: (state) => {
			state.id = '';
			state.name = '';
			state.email = '';
			state.profile_picture = '';
			localStorage.removeItem('currentUser');
		},
	},
});

export const { setCurrentUser, resetCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
