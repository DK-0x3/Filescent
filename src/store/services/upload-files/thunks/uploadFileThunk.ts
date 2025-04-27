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
import { useSelector } from 'react-redux';
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
	async ({ file }, { dispatch, rejectWithValue }) => {
		const fileId = uuidv4();
		// const sessionId = useSelector(getSessionId);
		// console.log(sessionId);

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

			console.log('Base64 файла:', fileBase64);

			const response = await axios.post<IUploadFileResponse>(
				`${API_URL}/api/file/save`,
				{
					files: [fileBase64]
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'X-Session-ID': 'sessionId',
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

			console.log(response.data);
			// const formData = new FormData();
			// formData.append('file', file);
			//
			// dispatch(addUploadFiles([{
			// 	id: fileId,
			// 	name: file.name,
			// 	size: file.size,
			// 	type: file.type,
			// 	status: UploadStatus.IDLE,
			// 	progress: null,
			// }]));
			//
			// for (const [key, value] of formData.entries()) {
			// 	console.log(key, value);
			// }
			// const response = await axios.post<IUploadFileResponse>(
			// 	`${API_URL}/api/file/save`,
			// 	formData,
			// 	{
			// 		headers: {
			// 			'Content-Type': 'multipart/form-data',
			// 			'X-Session-ID': 'sdfsdfsd',
			// 		},
			// 		onUploadProgress: (event) => {
			// 			if (event.total) {
			// 				dispatch(
			// 					updateUploadFileProgress({
			// 						id: fileId,
			// 						progress: {
			// 							loaded: event.loaded,
			// 							total: event.total,
			// 						}
			// 					})
			// 				);
			// 				dispatch(setUploadFilesLoading([ fileId ]));
			// 			}
			// 		},
			// 	}
			// );
			// console.log(response.data);

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