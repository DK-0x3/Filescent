import { RootState } from '../../../store';

export const getUploadFilesUrl = (state: RootState) => state.uploadFiles.filesUrl;