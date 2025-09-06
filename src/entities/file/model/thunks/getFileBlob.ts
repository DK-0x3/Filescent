import axios from 'axios';
import { API_URL } from '../../../../app/env';

export const getFileBlob = async (fileId: string, password?: string): Promise<Blob> => {
	const headers: Record<string, string> = {
		...(password ? { 'X-Password': password } : {}),
	};

	const response = await axios.get<Blob>(
		`${API_URL}/api/file/${fileId}`,
		{
			headers,
			responseType: 'blob',
		}
	);

	return response.data;
};
