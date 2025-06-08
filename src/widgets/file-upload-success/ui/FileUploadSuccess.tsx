import './FileUploadSuccess.scss';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUploadFiles } from '../../../store/services/upload-files/selectors/getUploadFiles';
import React, { useRef } from 'react';
import { getUploadGlobalProgress } from '../../../store/services/upload-files/selectors/getUploadGlobalProgress';
import { uploadFileThunk } from '../../../store/services/upload-files/thunks/uploadFileThunk';
import LogoBig from '../../../shared/assets/svg/logoBig.svg';
import { UTILS } from '../../../shared/utils/Utils';
import QRCode from '../../../shared/ui/qr-code/QRCode';
import { getUploadFilesUrl } from '../../../store/services/upload-files/selectors/getUploadUrl';
import CopyLinkSvg from '../../../shared/assets/svg/copyLink.svg';
import CopySvg from '../../../shared/assets/svg/copy.svg';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../modal/ui/ModalContext';

const FileUploadSuccess = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const uploadedFiles = useSelector(getUploadFiles);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const load = useSelector(getUploadGlobalProgress);
	const urlId = useSelector(getUploadFilesUrl);
	const domain = window.location.origin;

	const { openModal } = useModal();

	const filesUrl = urlId !== null ? (`${domain}/${urlId}`) : '';

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		if (files) {
			Array.from(files).forEach((file) => {
				dispatch(uploadFileThunk({ file }));
			});
		}
	};

	const handleUploadFilesClick = () => {
		fileInputRef.current?.click();
	};

	const handleCopy = async () => {
		await navigator.clipboard.writeText(filesUrl);
		toast(t('Скопировано'), {
			icon: <img src={CopySvg} alt='' />,
			duration: 1000,
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff',
			},
		});
	};
	
	const handleOpenQR = (event: React.MouseEvent) => {
		event.stopPropagation();
		openModal(<QRCode size={800} text={filesUrl} />);
	};

	return (
		<div className='file-upload-success'>
			{/* Скрытый инпут */}
			<input
				type="file"
				multiple
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>

			<div className='file-upload-success-qr'>
				<QRCode onClick={handleOpenQR} cursor='pointer' size={300} text={filesUrl} />
				<div className='file-upload-success-text'>
					<img src={CopyLinkSvg} alt='' />
					<span
						className='file-upload-success-qr-title'
						onClick={handleCopy}
						title={t('Нажмите, чтобы скопировать')}
					>
						{filesUrl}
					</span>
				</div>
			</div>

			<img
				className='file-upload-success-logo'
				src={LogoBig}
				onClick={handleUploadFilesClick}
			/>

			<div className='file-upload-success-description'>
				<span className="file-upload-success-title">
					{t('Файлы') + ': ' + uploadedFiles.length}
				</span>
				<br/>
				<span className="file-upload-success-loaded">
					{UTILS.formatFileSize(load.total)}
				</span>
			</div>
		</div>
	);
};

export default FileUploadSuccess;