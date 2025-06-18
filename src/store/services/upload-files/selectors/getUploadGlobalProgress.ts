import { IProgress } from '../../../../shared/types/IProgress';
import { createSelector } from '@reduxjs/toolkit';
import { getUploadFiles } from './getUploadFiles';

export const getUploadGlobalProgress = createSelector(
	[getUploadFiles],
	(uploadFiles): IProgress => {
		const validFiles = uploadFiles.filter(file => file.progress !== null);

		const loaded = validFiles.reduce((res, file) => res + file.progress!.loaded, 0);
		const total = validFiles.reduce((res, file) => res + file.progress!.total, 0);

		const speed = validFiles.reduce((res, file) => res + (file.progress?.speed ?? 0), 0);

		const eta = speed > 0 && total > 0
			? (total - loaded) / speed
			: 0;

		return { loaded, total, speed, eta };
	}
);