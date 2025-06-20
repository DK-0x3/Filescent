import './InputApp.scss';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IInputAppProps {
    className?: string;
    placeholder?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
			className={`InputApp ${className}`}
			type={type}
			onChange={onChange}
			placeholder={t(placeholder)}
		/>
	);
};