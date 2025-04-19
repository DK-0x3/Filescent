import { RootState } from '../../../store';

export const getUploadFiles = (state: RootState) => state.uploadFiles.uploadedFiles;