import './InputOutlinedMUI.scss';
import { InputAdornment, OutlinedInput, SxProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IInputOutlinedMUIProps {
    type?: 'text' | 'password' | 'number';
    startAdornment?: string;
    sxStartAdornment?: SxProps;
    endAdornment?: string;
    sxEndAdornment?: SxProps;
    placeholder?: string;
    sx?: SxProps;
}

export const InputOutlinedMUI = (props: IInputOutlinedMUIProps) => {
	const { t } = useTranslation();
    
	const {
		startAdornment,
		sxStartAdornment,
		endAdornment,
		sxEndAdornment,
		placeholder,
		sx,
		type = 'text',
	} = props;

	return (
		<OutlinedInput
			type={type}
			startAdornment={
				startAdornment ? (
					<InputAdornment 
						position="start"
						sx={{
							'& .MuiTypography-root': {
								color: 'var(--white-primary)',
							},
							...(sxStartAdornment || '')
						}}
					>
						{t(startAdornment)}
					</InputAdornment>
				) : undefined
			}
			endAdornment={
				endAdornment ? (
					<InputAdornment 
						position="end"
						sx={{
							'& .MuiTypography-root': {
								color: 'var(--white-primary)',
							},
							...(sxEndAdornment || '')
						}}>
						{t(endAdornment)}
					</InputAdornment>
				) : undefined
			}
			placeholder={placeholder && t(placeholder) || ''}

			sx={{
				'& input[type=number]': {
					MozAppearance: 'textfield', // Убирает стрелки в Firefox
				},
				'& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
					WebkitAppearance: 'none', // Убирает стрелки в Chrome, Safari, Edge
					margin: 0, // Убирает возможные отступы
				},
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
					padding: '7px 0 7px 8px',
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