import React, { useState } from 'react';
import { Switch } from '@mui/material';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { togglePassword } from '../../../store/services/togglePassword/parametersSettingsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface ISwitchMUIProps {
	className?: string;
	onToggle?: (checked: boolean) => Promise<boolean>; // Возвращает промис для обработки
}

export const SwitchMUI: React.FC<ISwitchMUIProps> = (props) => {
	const { className, onToggle } = props;

	const dispatch = useAppDispatch();
	const passwordEnabled = useSelector((state: RootState) => state.parameterSettings.passwordEnabled);

	const [isProcessing, setIsProcessing] = useState(false); // Флаг для предотвращения спама

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (isProcessing) return; // Блокируем повторное нажатие пока идёт обработка

		const isChecked = event.target.checked;
		setIsProcessing(true);

		try {
			if (onToggle) {
				const success = await onToggle(isChecked);
				if (success) {
					dispatch(togglePassword(isChecked));
				} else {
					console.error('Toggle action failed');
				}
			} else {
				dispatch(togglePassword(isChecked));
			}
		} catch (error) {
			console.error('Error during toggle:', error);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<Switch
			className={className}
			checked={passwordEnabled}
			onChange={handleChange}
			sx={{
				'& .MuiSwitch-thumb': {
					color: passwordEnabled ? 'var(--green-light)' : 'var(--gray-dark)',
				},
				'& .MuiSwitch-track': {
					backgroundColor: passwordEnabled ? 'red' : 'red',
				},
				'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
					backgroundColor: 'var(--green-dark)',
				},
			}}
			disabled={isProcessing} // Отключаем переключатель, пока идёт обработка
		/>
	);
};
