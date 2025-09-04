import { useAppDispatch } from '../../../store/types/useAppDispatch';
import ErrorIcon from '../../../shared/assets/svg/error.svg';
import styles from './FileUploadError.module.scss';
import { useTranslation } from 'react-i18next';
import { setStatus } from '../../../store/services/upload-files/slice/uploadFilesSlice';
import { UploadStatus } from '../../../store/services/upload-files/types/UploadStatus';

const FileUploadError = () => {
	const { t } = useTranslation();

	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(setStatus(UploadStatus.IDLE));
	};

	return (
		<div className={styles.Wrapper}>
			<img
				className={styles.Logo}
				src={ErrorIcon}
				onClick={handleClick}
				draggable="false"
			/>

			<div className={styles.Content}>
				<span className={styles.Title}>
					{t('Ошибка загрузки')}
				</span>

				<button className={styles.Button} onClick={handleClick}>
					{t('Повторить попытку')}
				</button>
			</div>
		</div>
	);
};

export default FileUploadError;
