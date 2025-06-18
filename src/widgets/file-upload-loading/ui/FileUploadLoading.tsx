import './FileUploadLoading.scss';
import LogoBig from '../../../shared/assets/svg/logoBig.svg';
import React, { useRef } from 'react';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUploadFiles } from '../../../store/services/upload-files/selectors/getUploadFiles';
import { getUploadGlobalProgress } from '../../../store/services/upload-files/selectors/getUploadGlobalProgress';
import { uploadFileThunk } from '../../../store/services/upload-files/thunks/uploadFileThunk';
import { useTranslation } from 'react-i18next';
import { UTILS } from '../../../shared/utils/Utils';
import toast from 'react-hot-toast';

const FileUploadLoading = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const uploadedFiles = useSelector(getUploadFiles);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const load = useSelector(getUploadGlobalProgress);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		if (files) {
			dispatch(uploadFileThunk({ files: Array.from(files) }));
		}
	};

	const handleClick = () => {
		toast(t('Ожидайте завершения'), {
			duration: 1000,
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff',
			},
		});
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
					{UTILS.formatFileSize(load.loaded) + ' / '
						+ UTILS.formatFileSize(load.total)}
				</span>
				<span className='file-upload-loading-info'>
					<br/>
					{t('Осталось') + ' ≈ '}{UTILS.formatEtaVerbose(load.eta)}
					<br/>
					{t('Скорость') + ' ≈ '}{UTILS.formatSpeed(load.speed)}
					<br/>
				</span>
			</div>
		</div>
	);
};

export default FileUploadLoading;