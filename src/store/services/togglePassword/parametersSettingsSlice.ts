import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITogglePassword {
    passwordEnabled: boolean;
}

export const initialState: ITogglePassword = {
	passwordEnabled: false,
};

const parametersSettingsSlice = createSlice({
	name: 'parametersSettings',
	initialState,
	reducers: {
		togglePassword(state, action: PayloadAction<boolean>) {
			state.passwordEnabled = action.payload;
		},
	},
	// extraReducers: (builder) => {
	// 	builder;
	// 	// .addCase(togglePasswordAsync.rejected, (state, action) => {
	// 	// 	state.status = 'failed';
	// 	// 	state.error = action.payload as string || 'Failed to fetch todos';
	// 	// });
	// },
});

export const { togglePassword } = parametersSettingsSlice.actions;

export default parametersSettingsSlice.reducer;