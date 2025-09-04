import React, { useRef } from 'react';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import LogoBig from '../../../shared/assets/svg/logoBig.svg';
import styles from './FileUploadIdle.module.scss';
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
		<div className={styles.Wrapper}>
			{/* Скрытый инпут */}
			<input
				type="file"
				multiple
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>

			<img
				className={styles.Logo}
				src={LogoBig}
				onClick={handleClick}
				draggable="false"
			/>

			<span className={styles.Title}>
				{t('Перетащи файлы')}<br />{t('для загрузки')}
			</span>
		</div>
	);
};

export default FileUploadIdle;
