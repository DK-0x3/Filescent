import React, { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { getUploadFiles } from '../../../store/services/upload-files/selectors/getUploadFiles';
import { useSelector } from 'react-redux';
import LogoBig from '../../../shared/assets/svg/logoBig.svg';
import './FileUploadIdle.scss';
import { useTranslation } from 'react-i18next';
import { uploadFileThunk } from '../../../store/services/upload-files/thunks/uploadFileThunk';
import { getUploadGlobalProgress } from '../../../store/services/upload-files/selectors/getUploadGlobalProgress';

const FileUploadIdle = () => {
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

	useEffect(() => {
		// console.log(uploadedFiles);
		// console.log(load);
	}, [uploadedFiles]);

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

			{/* Кастомная кнопка */}
			<img
				className='file-upload-logo'
				src={LogoBig}
				onClick={handleClick}
			/>

			<span className="file-upload-title">
				{t('Перетащи файлы')}<br />{t('для загрузки')}
			</span>
			
			<p>
				{load.loaded + ' / ' + load.total}
				<br/>
				{load.loaded / load.total * 100 + ' / 100'}
			</p>

			{/* Список файлов */}
			{/*<div style={{ marginTop: '1rem' }}>*/}
			{/*	<h3>Загруженные файлы:</h3>*/}
			{/*	<ul>*/}
			{/*		{uploadedFiles.map((file, index) => (*/}
			{/*			<li key={index}>{file.name}</li>*/}
			{/*		))}*/}
			{/*	</ul>*/}
			{/*</div>*/}
		</div>
	);
};

export default FileUploadIdle;
