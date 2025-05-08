import './InputPasswordOutlinedMUI.scss';
import { IconButton, InputAdornment, OutlinedInput, SxProps } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Visibility } from '@mui/icons-material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IInputPasswordOutlinedMUIProps {
    placeholder?: string;
	sx?: SxProps;
	onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPasswordOutlinedMUI = (props: IInputPasswordOutlinedMUIProps) => {
	const { t } = useTranslation();
	
	const {
		placeholder,
		sx,
		onInputChange,
	} = props;

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onInputChange) {
			onInputChange(event);
		}
	};

	return (
		<OutlinedInput
			onInput={handleChange}
			type={showPassword ? 'text' : 'password'}
			endAdornment={
				<InputAdornment position="end">
					<IconButton
						aria-label={
							showPassword ? 'hide the password' : 'display the password'
						}
						onClick={handleClickShowPassword}
						onMouseDown={handleMouseDownPassword}
						onMouseUp={handleMouseUpPassword}
						edge="end"
					>
						{showPassword
							? <VisibilityOff sx={{ color: 'var(--gray-dark)' }} />
							: <Visibility sx={{ color: 'var(--gray-light)' }} />}
					</IconButton>
				</InputAdornment>
			}
			placeholder={placeholder && t(placeholder) || ''}

			sx={{
				'&:hover .MuiOutlinedInput-notchedOutline': {
					borderColor: 'var(--gray-light)',
				},
				'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
					borderColor: 'var(--gray-light)',
				},
				'& .MuiInputBase-input::placeholder': {
					color: 'var(-gray-dark)',
				},
				'& .MuiInputBase-input': {
					height: '100%',
					padding: '5px 0 5px 8px',
					color: 'var(--white-primary)',
				},
				'& .MuiOutlinedInput-notchedOutline': {
					borderColor: 'var(--gray-dark)',
				},
				...(sx || {}),
			}}
		/>
	);
};