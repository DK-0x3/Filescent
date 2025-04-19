import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../env';
import { IUploadResponse } from '../../store/services/download-file/types/IUploadResponse';
import { baseQuery } from './baseQuery';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQuery,
	refetchOnReconnect: true,
	endpoints: (builder) => ({
		uploadFile: builder.mutation<IUploadResponse, File>({
			query: (file) => {
				const formData = new FormData();
				formData.append('file', file);

				return {
					url: API_URL + '/upload',
					method: 'POST',
					body: formData,
				};
			},
		}),
	}),
});

export const { useUploadFileMutation } = api;