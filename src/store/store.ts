import { configureStore } from '@reduxjs/toolkit';
import parametersSettingsSlice from './services/togglePassword/parametersSettingsSlice';

const store = configureStore({
	reducer: {
		parameterSettings: parametersSettingsSlice,
	},
});

// Экспорт типов для глобального состояния и dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
