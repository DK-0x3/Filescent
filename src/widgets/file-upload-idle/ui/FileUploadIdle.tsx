import React, { useRef } from 'react';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import LogoBig from '../../../shared/assets/svg/logoBig.svg';
import './FileUploadIdle.scss';
import { useTranslation } from 'react-i18next';
import { uploadFileThunk } from '../../../store/services/upload-files/thunks/uploadFileThunk';

const FileUploadIdle = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		
		if (files) {
			dispatch(uploadFileThunk({ files: Array.from(files) }));
		}
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className='file-upload-idle'>
			{/* Скрытый инпут */}
			<input
				type="file"
				multiple
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>

			<img
				className='file-upload-idle-logo'
				src={LogoBig}
				onClick={handleClick}
			/>

			<span className="file-upload-idle-title">
				{t('Перетащи файлы')}<br />{t('для загрузки')}
			</span>
		</div>
	);
};

export default FileUploadIdle;
