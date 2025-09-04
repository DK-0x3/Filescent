import styles from './Navbar.module.scss';
import logo from '../../../shared/assets/svg/logo.svg';
import { LangSwitcher } from '../../../shared/ui/lang-switcher/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../app/rout/routes';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { clearUploadFiles, setStatus } from '../../../store/services/upload-files/slice/uploadFilesSlice';
import { UploadStatus } from '../../../store/services/upload-files/types/UploadStatus';
import { initSession } from '../../../store/services/session/thunk/initSession';
import classNames from 'classnames';

interface INavbarProps {
    className?: string;
}

export const Navbar = (props: INavbarProps) => {
	const {
		className,
	} = props;

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const goHome = () => {
		navigate(ROUTES.HOME);

		dispatch(clearUploadFiles());
		dispatch(setStatus(UploadStatus.IDLE));
		dispatch(initSession());
	};

	const { t } = useTranslation();

	return (
		<div className={classNames(styles.Wrapper, className)}>
			<img src={logo} className={styles.Logo} alt="Vite logo" draggable="false"/>

			{/* eslint-disable-next-line i18next/no-literal-string */}
			<label onClick={goHome} className={styles.Title}>Filescent</label>
			<label className={styles.TitleEnd}>{t('Лучший обменник файлами!')}</label>

			<LangSwitcher/>
		</div>
	);
};