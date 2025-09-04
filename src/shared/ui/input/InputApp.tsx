import styles from './InputApp.module.scss';
import { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface IInputAppProps {
    className?: string;
    placeholder?: string;
    type?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputApp: FC<IInputAppProps> = (props: IInputAppProps) => {
	const {
		placeholder = '',
		className,
		onChange,
		type = 'text',
		...otherProps
	} = props;

	const { t } = useTranslation();

	return (
		<input {...otherProps}
			className={classNames(styles.InputApp, className)}
			type={type}
			onChange={onChange}
			placeholder={t(placeholder)}
		/>
	);
};