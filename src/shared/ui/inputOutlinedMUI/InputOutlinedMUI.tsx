import './InputOutlinedMUI.scss';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Visibility } from '@mui/icons-material';
import React, { useState } from 'react';

interface IInputOutlinedMUIProps {
    placeholder?: string;
    className?: string;
}

export const InputOutlinedMUI = (props: IInputOutlinedMUIProps) => {
	const {
		placeholder,
		className,
	} = props;

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<div className={className}>
			<OutlinedInput
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
				placeholder={placeholder || ''}

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
					}
				}}
			/>
		</div>
	);
};