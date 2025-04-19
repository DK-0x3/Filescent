import { createSlice } from '@reduxjs/toolkit';
import { IDownloadFileSchema } from '../types/IDownloadFileSchema.ts';
import { DownloadStatus } from '../types/DownloadStatus.ts';

const initialState: IDownloadFileSchema = {
	status: DownloadStatus.IDLE,
	error: null,
	fileUrl: null,
	uploadedFiles: [],
};

const downloadFileSlice = createSlice({
	name: 'downloadFile',
	initialState,
	reducers: {

	},

});

export const {

} = downloadFileSlice.actions;

export default downloadFileSlice.reducer;