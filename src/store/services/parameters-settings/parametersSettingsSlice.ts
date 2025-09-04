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
		setIsEnablePassword(state, action: PayloadAction<boolean>) {
			state.isEnablePassword = action.payload;
		},
		setEnableCustomTime(state, action: PayloadAction<boolean>) {
			state.isEnableCustomTime = action.payload;
		},
		setEnableCustomCountLoad(state, action: PayloadAction<boolean>) {
			state.isEnableCustomCountLoad = action.payload;
		},
		setEnableParametersUI(state, action: PayloadAction<boolean>) {
			state.isEnable = action.payload;
		}
	}
});

export const {
	setIsEnablePassword,
	setEnableCustomTime,
	setEnableCustomCountLoad,
	setEnableParametersUI,
} = parametersSettingsSlice.actions;

export default parametersSettingsSlice.reducer;