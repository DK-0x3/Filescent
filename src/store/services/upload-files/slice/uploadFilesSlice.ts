import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUploadFilesSchema, IUploadFile } from '../types/IUploadFilesSchema';
import { UploadStatus } from '../types/UploadStatus';

const initialState: IUploadFilesSchema = {
	status: UploadStatus.IDLE,
	error: null,
	filesUrl: null,
	uploadedFiles: [],
};

const uploadFilesSlice = createSlice({
	name: 'uploadFiles',
	initialState,
	reducers: {
		addUploadFiles(state, action: PayloadAction<IUploadFile[]>) {
			state.uploadedFiles.push(...action.payload);
		},
		clearUploadFiles(state) {
			state.uploadedFiles.length = 0;
		},
		updateUploadFileProgress(
			state,
			action: PayloadAction<{ id: string; progress: { loaded: number; total: number } }>
		) {
			const file = state.uploadedFiles.find(f => f.id === action.payload.id);
			if (file) {
				file.progress = action.payload.progress;
			}
		},
		setUploadFilesSuccess(state, action: PayloadAction<string[]>) {
			state.uploadedFiles.forEach((uploadFile) => {
				if (action.payload.includes(uploadFile.id)) {
					uploadFile.status = UploadStatus.SUCCESS;
				}
			});
		},
		setUploadFilesLoading(state, action: PayloadAction<string[]>) {
			state.uploadedFiles.forEach((uploadFile) => {
				if (action.payload.includes(uploadFile.id)) {
					uploadFile.status = UploadStatus.LOADING;
				}
			});
		},
		setUploadFilesIdle(state, action: PayloadAction<string[]>) {
			state.uploadedFiles.forEach((uploadFile) => {
				if (action.payload.includes(uploadFile.id)) {
					uploadFile.status = UploadStatus.IDLE;
				}
			});
		},
		setUploadFilesError(state, action: PayloadAction<string[]>) {
			state.uploadedFiles.forEach((uploadFile) => {
				if (action.payload.includes(uploadFile.id)) {
					uploadFile.status = UploadStatus.ERROR;
				}
			});
		},
		setStatus(state, action: PayloadAction<UploadStatus>) {
			state.status = action.payload;
		},
		setError(state, action: PayloadAction<string>) {
			state.error = action.payload;
		},
		setFilesUrl(state, action: PayloadAction<string>) {
			state.filesUrl = action.payload;
		},
	},
});

export const {
	addUploadFiles,
	clearUploadFiles,
	setStatus,
	setError,
	setFilesUrl,
	setUploadFilesSuccess,
	setUploadFilesError,
	setUploadFilesLoading,
	setUploadFilesIdle,
	updateUploadFileProgress,
} = uploadFilesSlice.actions;

export default uploadFilesSlice.reducer;