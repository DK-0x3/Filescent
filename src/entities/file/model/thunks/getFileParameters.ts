import axios from 'axios';
import { API_URL } from '../../../../app/env';

export interface IFilesDownloadParameters {
    countDownload: number,
    dateDeleted: string,
    password: boolean,
    description: string,
}

export const getFileParameters = async (fileId: string) => {
	const responseGet = await axios.get<IFilesDownloadParameters>(
		`${API_URL}/api/file/${fileId}/data`
	);

	return responseGet.data;
};