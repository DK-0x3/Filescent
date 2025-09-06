import styles from './DownloadPage.module.scss';
import { useParams } from 'react-router-dom';
import React from 'react';
import QRCode from '../../shared/ui/qr-code/QRCode';
import CopyLinkSvg from '../../shared/assets/svg/copyLink.svg';
import DownloadLogo from '../../shared/assets/svg/downloadLogo.svg';
import { useModal } from '../../widgets/modal/ui/ModalContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import CopySvg from '../../shared/assets/svg/copy.svg';
import { UTILS } from '../../shared/utils/Utils';
import { DownloadPassword } from '../../widgets/download-password/DownloadPassword';
import i18n from 'i18next';
import { useIsMobile } from '../../shared/hooks/useIsMobile';
import copy from 'copy-to-clipboard';
import { useFileDownload } from './hooks/useFileDownload';

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

	const { openModal } = useModal();
	const isMobile = useIsMobile();

	const { blob, blobUrl, parameters, isPassword } = useFileDownload(id);

	const domain = window.location.origin;
	const filesUrl = `${domain}/${id}`;

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

	if (isPassword !== IncorrectPassword.CORRECT) {
		return <DownloadPassword isPassword={isPassword} />;
	}

	return (
		<div className={styles.DownloadPage}>
			<div>
				<QRCode onClick={handleOpenQR} cursor='pointer' size={isMobile ? 250 : 300} text={filesUrl} />
				<div>
					<img className='QRImg' src={CopyLinkSvg} alt='' />
					<span
						className='QRTitle'
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
				<span className="Loaded">
					{UTILS.formatFileSize(blob?.size ?? 0)}
				</span>
			</div>

			<div className={styles.DownloadPageParameters}>
				<span>
					{t('Осталось скачиваний')}: {parameters?.countDownload}
				</span>
				<span>
					{t('Срок харнения')}: {new Intl.DateTimeFormat(i18n.language, {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					}).format((parameters && new Date(parameters?.dateDeleted) || 0))}
				</span>
			</div>

			<div></div>

			<div className={styles.DownloadPageDescription}>
				{parameters?.description}
			</div>
		</div>
	);
};