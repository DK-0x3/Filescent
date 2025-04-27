import './FileUploadLoading.scss';
import LogoBig from '../../../shared/assets/svg/logoBig.svg';
import React, { useRef } from 'react';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUploadFiles } from '../../../store/services/upload-files/selectors/getUploadFiles';
import { getUploadGlobalProgress } from '../../../store/services/upload-files/selectors/getUploadGlobalProgress';
import { uploadFileThunk } from '../../../store/services/upload-files/thunks/uploadFileThunk';
import { FILE_UTILS } from '../../../shared/utils/fileUtils';
import { useTranslation } from 'react-i18next';

const FileUploadLoading = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const uploadedFiles = useSelector(getUploadFiles);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const load = useSelector(getUploadGlobalProgress);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		if (files) {
			Array.from(files).forEach((file) => {
				dispatch(uploadFileThunk({ file }));
			});
		}
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};
    
	return (
		<div className='file-upload-loading'>
			{/* Скрытый инпут */}
			<input
				type="file"
				multiple
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>

			<img
				className='file-upload-loading-logo'
				src={LogoBig}
				onClick={handleClick}
			/>

			<div className='file-upload-loading-description'>
				<span className="file-upload-loading-title">
					{t('Файлы') + ': ' + uploadedFiles.length}
				</span>
				<br/>
				<span className="file-upload-loading-loaded">
					{FILE_UTILS.formatFileSize(load.loaded) + ' / '
						+ FILE_UTILS.formatFileSize(load.total)}
				</span>
			</div>
		</div>
	);
};

export default FileUploadLoading;