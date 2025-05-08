import styles from './DownloadPassword.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IncorrectPassword } from '../../page/download/DownloadPage';

interface IDownloadPasswordProps {
	isPassword: IncorrectPassword;
}

export const DownloadPassword = (props: IDownloadPasswordProps) => {
	const { t } = useTranslation();
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = () => {
		console.log('Пароль отправлен:', password);
		navigate('?password=' + password, { replace: true });
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