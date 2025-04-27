import { IProgress } from '../../../../shared/types/IProgress';
import { createSelector } from '@reduxjs/toolkit';
import { getUploadFiles } from './getUploadFiles';

export const getUploadGlobalProgress = createSelector(
	[getUploadFiles],
	(uploadFiles): IProgress => {
		const loaded = uploadFiles.reduce(
			(res, file) => res + (file.progress !== null ? file.progress.loaded : 0),
			0
		);
		const total = uploadFiles.reduce(
			(res, file) => res + (file.progress !== null ? file.progress.total : 0),
			0
		);

		return { loaded, total };
	}
);