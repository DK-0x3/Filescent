import React, { useState } from 'react';
import { Switch } from '@mui/material';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { useSelector } from 'react-redux';
import { ISwitchMUIProps } from './interface/ISwitchMUIProps';

export const SwitchMUI: React.FC<ISwitchMUIProps> = (props: ISwitchMUIProps) => {
	const { onPrevToggle, sx, changeSelector, onDispatchToggle, onChange } = props;

	const dispatch = useAppDispatch();
	const passwordEnabled = useSelector(changeSelector);

	const [isProcessing, setIsProcessing] = useState(false);

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (isProcessing) return; // Блокируем повторное нажатие пока идёт обработка

		const isChecked = event.target.checked;
		setIsProcessing(true);

		try {
			if (onPrevToggle) {
				const success = await onPrevToggle(isChecked);
				if (success) {
					dispatch(onDispatchToggle(isChecked));
					if (onChange) {
						onChange(isChecked);
					}
				} else {
					console.error('Toggle action failed');
				}
			} else {
				dispatch(onDispatchToggle(isChecked));
				if (onChange) {
					onChange(isChecked);
				}
			}
		} catch (error) {
			console.error('Error during toggle:', error);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<Switch
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
				...(sx || {}),
			}}
			disabled={isProcessing}
		/>
	);
};
