import { createAppAsyncThunk } from '../../../../store/types/createAppAsyncThunk';
import { getSessionId } from '../../../../store/services/session/selectors/getSessionId';
import axios from 'axios';
import { API_URL } from '../../../../app/env';

interface IUploadFileResponse {
   status: string;
}

interface IUploadFileThunk {
    days: number;
}

export const updateTimeParameterThunk = createAppAsyncThunk<
    IUploadFileResponse,
    IUploadFileThunk
>(
	'upload/file',
	async ({ days }, { rejectWithValue, getState }) => {
		const state = getState();
		const sessionId = getSessionId(state);

		try {
			const response = await axios.put<IUploadFileResponse>(
				`${API_URL}/api/file/update/deleted`,
				{
					count_day_to_deleted: days,
				},
				{
					headers: {
						'X-Session-ID': sessionId,
					}
				}
			);

			return response.data;
		} catch (err) {
			return rejectWithValue(`Ошибка ${err}`);
		}
	}
);