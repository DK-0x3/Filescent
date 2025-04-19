import { RootState } from '../../../store';
import { IProgress } from '../../../../shared/types/IProgress';

export const getUploadGlobalProgress = (state: RootState): IProgress => {
	const uploadFiles = state.uploadFiles.uploadedFiles;
	const loaded = uploadFiles.reduce((res, file) => res + (file.progress !== null ? file.progress.loaded : 0), 0);
	const total = uploadFiles.reduce((res, file) => res + (file.progress !== null ? file.progress.total : 0), 0);

	return {
		loaded,
		total,
	};
};