import { combineReducers } from '@reduxjs/toolkit';
import parametersSettingsSlice from './services/parameters-settings/parametersSettingsSlice';
import sessionSlice from './services/session/slice/sessionSlice';
import uploadFilesSlice from './services/upload-files/slice/uploadFilesSlice';

export const reducers = combineReducers({
	parameterSettings: parametersSettingsSlice,
	session: sessionSlice,
	uploadFiles: uploadFilesSlice,
});