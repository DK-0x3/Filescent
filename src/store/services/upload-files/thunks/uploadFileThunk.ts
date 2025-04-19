import axios from 'axios';
import { createAppAsyncThunk } from '../../../types/createAppAsyncThunk';
import { UploadStatus } from '../types/UploadStatus';
import { API_URL } from '../../../../app/env';
import {
	addUploadFiles,
	setUploadFilesLoading,
	setUploadFilesSuccess,
	updateUploadFileProgress
} from '../slice/uploadFilesSlice';
import { v4 as uuidv4 } from 'uuid';

interface IUploadFileResponse {
    fileUrl: string;
}

interface IUploadFileThunk {
    file: File;
}

export const uploadFileThunk = createAppAsyncThunk<
    IUploadFileResponse,
    IUploadFileThunk
>(
	'upload/file',
	async ({ file }, { dispatch, rejectWithValue }) => {
		const fileId = uuidv4();

		try {
			const formData = new FormData();
			formData.append('file', file);

			dispatch(addUploadFiles([{
				id: fileId,
				name: file.name,
				size: file.size,
				type: file.type,
				status: UploadStatus.IDLE,
				progress: null,
			}]));

			const response = await axios.post<IUploadFileResponse>(
				` ${API_URL}/upload`,
				formData,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
					onUploadProgress: (event) => {
						// console.log('upload progress', event.progress);
						if (event.total) {
							dispatch(
								updateUploadFileProgress({ 
									id: fileId,
									progress: {
										loaded: event.loaded,
										total: event.total,
									}
								})
							);
							dispatch(setUploadFilesLoading([ fileId ]));
						}
					},
				}
			);
			dispatch(setUploadFilesSuccess([ fileId ]));

			return response.data;
		} catch (err) {
			dispatch(addUploadFiles([{
				id: fileId,
				name: file.name,
				size: file.size,
				type: file.type,
				status: UploadStatus.IDLE,
				progress: null,
			}]));
			return rejectWithValue('Ошибка при загрузке файла');
		}
	}
);