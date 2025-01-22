import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';

// Типизированный AsyncThunkConfig
export interface IThunkConfig {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: string; // Опционально, если используете rejectWithValue
}

// Обертка для createAsyncThunk
export const createAppAsyncThunk = <Returned, Arg>(
	type: string,
	payloadCreator: (
        arg: Arg,
        thunkAPI: {
            dispatch: AppDispatch;
            getState: () => RootState;
            rejectWithValue: (value: string) => unknown;
        }
    ) => Promise<Returned> | Returned
) => createAsyncThunk<Returned, Arg, IThunkConfig>(type, payloadCreator);
