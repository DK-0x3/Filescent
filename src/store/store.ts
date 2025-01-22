import { configureStore } from '@reduxjs/toolkit';
import parametersSettingsSlice from './services/parametersSettings/parametersSettingsSlice';
import { IStateSchema } from './IStateSchema';

const store = configureStore<IStateSchema>({
	reducer: {
		parameterSettings: parametersSettingsSlice,
	},
});

// Экспорт типов для глобального состояния и dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
