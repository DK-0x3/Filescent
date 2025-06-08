import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IParametersSettingsSchema } from './IParameterSettingsSchema';

export const initialState: IParametersSettingsSchema = {
	isEnablePassword: false,
	isEnableCustomTime: false,
	isEnableCustomCountLoad: false,
	isEnable: false,
};

const parametersSettingsSlice = createSlice({
	name: 'parametersSettings',
	initialState,
	reducers: {
		togglePassword(state, action: PayloadAction<boolean>) {
			state.isEnablePassword = action.payload;
		},
		toggleEnableCustomTime(state, action: PayloadAction<boolean>) {
			state.isEnableCustomTime = action.payload;
		},
		toggleEnableCustomCountLoad(state, action: PayloadAction<boolean>) {
			state.isEnableCustomCountLoad = action.payload;
		},
		toggleEnableParametersUI(state, action: PayloadAction<boolean>) {
			state.isEnable = action.payload;
		}
	}
});

export const {
	togglePassword,
	toggleEnableCustomTime,
	toggleEnableCustomCountLoad,
	toggleEnableParametersUI,
} = parametersSettingsSlice.actions;

export default parametersSettingsSlice.reducer;