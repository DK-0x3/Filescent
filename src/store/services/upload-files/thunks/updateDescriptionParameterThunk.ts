import { createAppAsyncThunk } from '../../../types/createAppAsyncThunk';
import { getSessionId } from '../../session/selectors/getSessionId';
import axios from 'axios';
import { API_URL } from '../../../../app/env';

interface IUploadFileResponse {
    status: string;
}

interface IUploadFileThunk {
    description: string;
}

export const updateDescriptionParameterThunk = createAppAsyncThunk<
    IUploadFileResponse,
    IUploadFileThunk
>(
	'upload/file',
	async ({ description }, { rejectWithValue, getState }) => {
		const state = getState();
		const sessionId = getSessionId(state);

		try {
			const response = await axios.put<IUploadFileResponse>(
				`${API_URL}/api/file/update/description`,
				{
					description: description,
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