import styles from './DownloadPassword.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IncorrectPassword } from '../../page/download/DownloadPage';

interface IDownloadPasswordProps {
	isPassword: IncorrectPassword;
}

export const DownloadPassword = (props: IDownloadPasswordProps) => {
	const { t } = useTranslation();

	const params = useParams() as Record<string, string | undefined>;
	const id = params.id;
	if (!id) {
		throw new Error('Missing file id');
	}

	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement>(null);

	// Автофокус при отображении компонента
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleSubmit = () => {
		sessionStorage.setItem(`file-password-${id}`, password);
		navigate(0); // перезагрузка компонента DownloadPage
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSubmit();
			setPassword('');
		}
	};

	return (
		<div className={styles.DownloadPassword}>
			<span>{t('Введите пароль')}</span>
			<input
				ref={inputRef}
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			{props.isPassword === IncorrectPassword.INCORRECT &&
				<span className={styles.DownloadPasswordIncorrect}>
					{t('Неверный пароль')}
				</span>}
		</div>
	);
};