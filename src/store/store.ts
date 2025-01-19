import { configureStore } from '@reduxjs/toolkit';

// Создание store
const store = configureStore({
    reducer: {
        
    },
});

// Экспорт типов для глобального состояния и dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
