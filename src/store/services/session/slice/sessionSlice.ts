import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISessionState } from '../types/ISessionState';
import { Language } from '../../../../shared/types/language';

const initialState: ISessionState = {
	sessionId: null,
	language: Language.RUSSIAN,
	lastActivity: Date.now(),
};

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setSessionData: (state, action: PayloadAction<ISessionState>) => {
			state.sessionId = action.payload.sessionId;
			state.language = action.payload.language;
			state.lastActivity = action.payload.lastActivity;
		},
		clearSessionData: (state) => {
			state.sessionId = null;
			state.language = Language.RUSSIAN;
			state.lastActivity = null;
		},
		setSessionLanguage: (state, action: PayloadAction<Language>) => {
			state.language = action.payload;
		},
		setSessionLastActivity: (state, action: PayloadAction<number>) => {
			state.lastActivity = action.payload;
		}
	},
});

export const { setSessionData, clearSessionData, setSessionLanguage, setSessionLastActivity } = sessionSlice.actions;
export default sessionSlice.reducer;