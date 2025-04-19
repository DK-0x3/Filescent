import { createAppAsyncThunk } from '../../../types/createAppAsyncThunk';

export const uploadFileThunk = createAppAsyncThunk<string, File>(
	'downloadFile/uploadFile',
	async (file, { rejectWithValue }) => {
		try {
			const formData = new FormData();
			formData.append('file', file);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error('Ошибка загрузки файла');
			}

			const data = await response.json();
			return data.url; // возвращаем URL загруженного файла
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);