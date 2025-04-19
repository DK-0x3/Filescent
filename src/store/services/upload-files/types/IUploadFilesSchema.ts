import { UploadStatus } from './UploadStatus';
import { IProgress } from '../../../../shared/types/IProgress';

export interface IUploadFile {
    id: string;
    name: string;
    size: number;
    type: string;
    status: UploadStatus,
    progress: IProgress | null;
}

export interface IUploadFilesSchema {
    status: UploadStatus;
    error: string | null;
    filesUrl: string | null; // например, URL загруженного файла
    uploadedFiles: IUploadFile[];
}