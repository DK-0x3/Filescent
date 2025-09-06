import axios from 'axios';
import { API_URL } from '../../../../app/env';

export const getFileBlob = async (fileId: string, password?: string): Promise<Blob> => {
	const response = await axios.get<Blob>(
		`${API_URL}/api/file/${fileId}`,
		{
			headers: { 'X-Password': password || '' },
			responseType: 'blob',
		}
	);

	return response.data;
};
