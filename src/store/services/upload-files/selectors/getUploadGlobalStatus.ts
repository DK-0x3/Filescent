import { RootState } from '../../../store';

export const getUploadGlobalStatus = (state: RootState) => state.uploadFiles.status;