import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

interface SignInStateData {
	signInDialogOpen: boolean;
	currentUser: UserData | null;
}

interface UserData {
	userName: string;
	userEmail: string;
	userProfilePictureUrl: string;
}

const initialState: SignInStateData = {
	signInDialogOpen: false,
	currentUser: {
		userName: '',
		userEmail: '',
		userProfilePictureUrl: ''
	},
}

export const signInStateSlice = createSlice({
	name: 'sign-in-state-slice',
	initialState,
	reducers: {
		setSignInDialogOpen: (state, action: PayloadAction<boolean>) => {
			state.signInDialogOpen = action.payload;
		},
		setCurrentUser: (state, action: PayloadAction<UserData | null>) => {
			state.currentUser = action.payload;
		}
	}
});

export const { setSignInDialogOpen, setCurrentUser } = signInStateSlice.actions;

export const selectSignInDialogOpen = (state: RootState) => state.signInState.signInDialogOpen;
export const selectCurrentUser = (state: RootState) => state.signInState.currentUser;

export default signInStateSlice.reducer;
