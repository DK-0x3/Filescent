import axios from 'axios';
import { createAppAsyncThunk } from '../../../types/createAppAsyncThunk';
import { UploadStatus } from '../types/UploadStatus';
import { API_URL } from '../../../../app/env';
import {
	addUploadFiles, setFilesUrl,
	setUploadFilesLoading,
	setUploadFilesSuccess,
	updateUploadFileProgress
} from '../slice/uploadFilesSlice';
import { v4 as uuidv4 } from 'uuid';
import { getSessionId } from '../../session/selectors/getSessionId';

interface IUploadFileResponse {
	sessionCode: string;
}

interface IUploadFileThunk {
    file: File;
}

export const uploadFileThunk = createAppAsyncThunk<
    IUploadFileResponse,
    IUploadFileThunk
>(
	'upload/file',
	async ({ file }, { dispatch, rejectWithValue, getState }) => {
		const fileId = uuidv4();

		const state = getState();
		const sessionId = getSessionId(state);

		try {
			const fileBase64 = await new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					if (typeof reader.result === 'string') {
						resolve(reader.result);
					} else {
						reject(new Error('Ошибка при чтении файла'));
					}
				};
				reader.onerror = (error) => reject(error);
			});

			const response = await axios.post<IUploadFileResponse>(
				`${API_URL}/api/file/save`,
				{
					file: {
						name: file.name,
						base64: fileBase64,
					}
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'X-Session-ID': sessionId,
					},
					onUploadProgress: (event) => {
						if (event.total) {
							dispatch(updateUploadFileProgress({
								id: fileId,
								progress: {
									loaded: event.loaded,
									total: event.total,
								}
							}));
							dispatch(setUploadFilesLoading([fileId]));
						}
					},
				}
			);

			dispatch(setUploadFilesSuccess([ fileId ]));
			dispatch(setFilesUrl(response.data.sessionCode));

			return response.data;
		} catch (err) {
			dispatch(addUploadFiles([{
				id: fileId,
				name: file.name,
				size: file.size,
				type: file.type,
				status: UploadStatus.ERROR,
				progress: null,
			}]));
			return rejectWithValue('Ошибка при загрузке файла');
		}
	}
);