import styles from './DownloadPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../app/env';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import QRCode from '../../shared/ui/qr-code/QRCode';
import CopyLinkSvg from '../../shared/assets/svg/copyLink.svg';
import DownloadLogo from '../../shared/assets/svg/downloadLogo.svg';
import { useModal } from '../../widgets/modal/ui/ModalContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import CopySvg from '../../shared/assets/svg/copy.svg';
import { UTILS } from '../../shared/utils/Utils';
import ROUTES from '../../app/routing/routes';
import { DownloadPassword } from '../../widgets/download-password/DownloadPassword';
import i18n from 'i18next';
import { useIsMobile } from '../../shared/hooks/useIsMobile';
import copy from 'copy-to-clipboard';

export interface IFilesDownloadParameters {
	message: {
		count_download: number,
		date_deleted: string,
		password: boolean,
		description: string,
	}
}

export enum IncorrectPassword {
	CORRECT = 'CORRECT',
	INCORRECT = 'INCORRECT',
	EMPTY = 'EMPTY',
}

export const DownloadPage = () => {
	const { t } = useTranslation();

	const params = useParams() as Record<string, string | undefined>;
	const id = params.id;
	if (!id) {
		throw new Error('Missing file id');
	}

	const navigate = useNavigate();
	const { openModal } = useModal();
	const isMobile = useIsMobile();

	const [blob, setBlob] = useState<Blob | null>(null);
	const [blobUrl, setBlobUrl] = useState<string | null>(null);
	const [parameters, setParameters] = useState<IFilesDownloadParameters | null>(null);

	const [isPassword, setIsPassword] = useState<IncorrectPassword>(IncorrectPassword.CORRECT);
	const domain = window.location.origin;

	const filesUrl = id !== null ? (`${domain}/${id}`) : '';

	const handleOpenQR = (event: React.MouseEvent) => {
		event.stopPropagation();
		openModal(<QRCode size={isMobile ? 320 : 800} text={filesUrl} />);
	};

	const handleCopy = async () => {
		copy(filesUrl);
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

	useEffect(() => {
		if (!id) return;

		const password = sessionStorage.getItem(`file-password-${id}`);

		const fetchFilesById = async (fileId: string) => {
			try {
				const responseGet = await axios.get<IFilesDownloadParameters>(
					`${API_URL}/api/file/${fileId}/data`
				);
				setParameters(responseGet.data);

				if (responseGet.data.message.password) {
					if (password !== null) {
						try {
							const response = await axios.get<Blob>(
								`${API_URL}/api/file/${fileId}`,
								{
									headers: {
										'X-Password': password,
									},
									responseType: 'blob'
								}
							);

							setBlob(response.data);
							const url = URL.createObjectURL(response.data);
							setBlobUrl(url);
							setIsPassword(IncorrectPassword.CORRECT);
						}
						catch (error) {
							if (axios.isAxiosError(error) && error.response?.status === 401) {
								console.log('Неверный пароль');
								setIsPassword(IncorrectPassword.INCORRECT);
							} else {
								console.log(error);
							}
						}
					} else {
						setIsPassword(IncorrectPassword.EMPTY);
					}
				} else {
					const response = await axios.get<Blob>(
						`${API_URL}/api/file/${fileId}`,
						{
							headers: {
								'X-Password': password,
							},
							responseType: 'blob'
						}
					);

					setBlob(response.data);
					const url = URL.createObjectURL(response.data);
					setBlobUrl(url);
				}
			} catch (error) {
				alert(t('Файлы удалены'));
				navigate(ROUTES.HOME);
				console.error('Ошибка при получении файла:', error);
			}
		};

		fetchFilesById(id);
	}, [id]);

	if (isPassword !== IncorrectPassword.CORRECT) {
		return (
			<DownloadPassword isPassword={isPassword}/>
		);
	}

	return (
		<div className={styles.DownloadPage}>
			<div>
				<QRCode onClick={handleOpenQR} cursor='pointer' size={isMobile ? 250 : 300} text={filesUrl} />
				<div>
					<img className='file-upload-success-qr-img' src={CopyLinkSvg} alt='' />
					<span
						className='file-upload-success-qr-title'
						onClick={handleCopy}
						title={t('Нажмите, чтобы скопировать')}
					>
						{filesUrl}
					</span>
				</div>
			</div>

			<a href={blobUrl || ''}>
				<img
					className={styles.DownloadPageLogo}
					src={DownloadLogo}
				/>
			</a>

			<div className={styles.DownloadPageProperty}>
				<span className={styles.DownloadPageTitle}>
					{/*{t('Файлы') + ': ' + (UTILS.getExtensionFromMime(blob?.type ?? 'anonim') || 'load')}*/}
					{t('Архив')}{' .zip'}
				</span>
				<br/>
				<span className="file-upload-success-loaded">
					{UTILS.formatFileSize(blob?.size ?? 0)}
				</span>
			</div>

			<div className={styles.DownloadPageParameters}>
				<span>
					{t('Осталось скачиваний')}: {parameters?.message.count_download}
				</span>
				<span>
					{t('Срок харнения')}: {new Intl.DateTimeFormat(i18n.language, {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					}).format(parameters?.message && new Date(parameters?.message.date_deleted))}
				</span>
			</div>

			<div></div>

			<div className={styles.DownloadPageDescription}>
				{parameters?.message.description}
			</div>
		</div>
	);
};