import { combineReducers } from '@reduxjs/toolkit';
import parametersSettingsSlice from './services/parameters-settings/parametersSettingsSlice';
import { api } from '../app/api/API';
import sessionSlice from './services/session/slice/sessionSlice';

export const reducers = combineReducers({
	parameterSettings: parametersSettingsSlice,
	session: sessionSlice,
	
	[api.reducerPath]: api.reducer,
});