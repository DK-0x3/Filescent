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
	message: {
		count: number;
		id: string;
		size: number;
	},
	status: string;
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
			// Добавляем файл в список
			dispatch(addUploadFiles([{
				id: fileId,
				name: file.name,
				size: file.size,
				type: file.type,
				status: UploadStatus.IDLE,
				progress: null,
			}]));

			// Создаём form data
			const formData = new FormData();
			formData.append('file', file);
			formData.append('filename', file.name);

			const response = await axios.post<IUploadFileResponse>(
				`${API_URL}/api/file/save`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
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

			dispatch(setUploadFilesSuccess([fileId]));
			dispatch(setFilesUrl(response.data.message.id));

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
