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

			uploadFilesSlice.caseReducers.checkAllUploadsFinished(state);
		},
		setUploadFilesLoading(state, action: PayloadAction<string[]>) {
			state.uploadedFiles.forEach((uploadFile) => {
				if (action.payload.includes(uploadFile.id)) {
					uploadFile.status = UploadStatus.LOADING;
				}
			});

			console.log('setUploadFilesLoading');
			uploadFilesSlice.caseReducers.checkAllUploadsFinished(state);
		},
		setUploadFilesIdle(state, action: PayloadAction<string[]>) {
			state.uploadedFiles.forEach((uploadFile) => {
				if (action.payload.includes(uploadFile.id)) {
					uploadFile.status = UploadStatus.IDLE;
				}
			});

			uploadFilesSlice.caseReducers.checkAllUploadsFinished(state);
		},
		setUploadFilesError(state, action: PayloadAction<string[]>) {
			state.uploadedFiles.forEach((uploadFile) => {
				if (action.payload.includes(uploadFile.id)) {
					uploadFile.status = UploadStatus.ERROR;
				}
			});

			uploadFilesSlice.caseReducers.checkAllUploadsFinished(state);
		},
		setStatus(state, action: PayloadAction<UploadStatus>) {
			state.status = action.payload;
		},
		setFilesUrl(state, action: PayloadAction<string>) {
			state.filesUrl = action.payload;
		},
		checkAllUploadsFinished(state) {
			if (state.uploadedFiles.length === 0) {
				state.status = UploadStatus.IDLE;
				console.log(1);
				return;
			}

			const hasLoadingOrIdle = state.uploadedFiles.some(file =>
				file.status === UploadStatus.LOADING || file.status === UploadStatus.IDLE
			);

			if (hasLoadingOrIdle) {
				state.status = UploadStatus.LOADING;
				console.log(2);
				return;
			}

			const hasError = state.uploadedFiles.some(file =>
				file.status === UploadStatus.ERROR
			);

			if (hasError) {
				state.status = UploadStatus.ERROR;
				console.log(3);
				return;
			}

			state.status = UploadStatus.SUCCESS;
			console.log(state.status);
		}
	},
});

export const {
	addUploadFiles,
	clearUploadFiles,
	setStatus,
	setUploadFilesSuccess,
	setUploadFilesError,
	setUploadFilesLoading,
	setUploadFilesIdle,
	updateUploadFileProgress,
	checkAllUploadsFinished,
	setFilesUrl,
} = uploadFilesSlice.actions;

export default uploadFilesSlice.reducer;