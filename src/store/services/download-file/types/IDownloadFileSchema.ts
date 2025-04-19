import { DownloadStatus } from './DownloadStatus';

export interface IDownloadFileSchema {
    status: DownloadStatus;
    error: string | null;
    fileUrl: string | null; // например, URL загруженного файла
    uploadedFiles: string[];
}