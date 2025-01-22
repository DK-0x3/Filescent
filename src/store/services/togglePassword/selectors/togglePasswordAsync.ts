import { createAppAsyncThunk } from '../../../types/createAppAsyncThunk';

export const togglePasswordAsync = createAppAsyncThunk(
	'parametersSettings/togglePasswordAsync',
	async function (toggle: boolean, { rejectWithValue, dispatch, getState }) {
		if (toggle) {

		} else {

		}
	}
);