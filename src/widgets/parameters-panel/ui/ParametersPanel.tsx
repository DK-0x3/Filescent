import './ParametersPanel.scss';
import { useTranslation } from 'react-i18next';
import timeIcon from '../../../shared/assets/svg/time.svg';
import countLoadIcon from '../../../shared/assets/svg/countLoad.svg';
import passwordIcon from '../../../shared/assets/svg/password.svg';
import { DropDownMenuHover } from '../../../shared/ui/drop-down-menu-hover/DropDownMenuHover';
import { SwitchMUI } from '../../../shared/ui/switch-mui/switchMUI';
import { InputPasswordOutlinedMUI } from '../../../shared/ui/input-password-outlined-mui/InputPasswordOutlinedMUI';
import { useSelector } from 'react-redux';
import { getPasswordEnabled } from '../../../store/services/parameters-settings/selectors/getPasswordEnabled';
import {
	toggleEnableCustomCountLoad,
	toggleEnableCustomTime,
	togglePassword
} from '../../../store/services/parameters-settings/parametersSettingsSlice';
import { DefaultTimeItems, DefaultTimeKeys, DefaultTimeSelectItem } from '../types/DefaultTimeItems';
import {
	DefaultCountLoadItems,
	DefaultCountLoadKeys,
	DefaultCountLoadSelectItem } from '../types/DefaultCountLoadItems';
import { IDropDownItem } from '../../../shared/ui/drop-down-menu-hover/interface/IDropDownItem';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { InputOutlinedMUI } from '../../../shared/ui/input-outlined-mui/InputOutlinedMUI';
import { getEnabledCustomTime } from '../../../store/services/parameters-settings/selectors/getEnabledCustomTime';
import {
	getEnabledCustomCountLoad
} from '../../../store/services/parameters-settings/selectors/getEnabledCustomCountLoad';
import { Tooltip } from '@mui/material';
import { updateTimeParameterThunk } from '../../../store/services/upload-files/thunks/updateTimeParameterThunk';
import { updateCountLoadParameterThunk } from
	'../../../store/services/upload-files/thunks/updateCountLoadParameterThunk';
import { updatePasswordParameterThunk } from '../../../store/services/upload-files/thunks/updatePasswordParameterThunk';
import { TextAreaDelayed } from '../../text-area-description/TextAreaDelayed';
import {
	updateDescriptionParameterThunk
} from '../../../store/services/upload-files/thunks/updateDescriptionParameterThunk';
import { ChangeEvent } from 'react';
import {
	getEnabledParametersPanel
} from '../../../store/services/parameters-settings/selectors/getEnabledParametersPanel';

interface IParametersPanelProps {
    className?: string;
}

export const ParametersPanel = (props: IParametersPanelProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const {
		className,
	} = props;

	const isPasswordEnable = useSelector(getPasswordEnabled);
	const isEnableCustomTime = useSelector(getEnabledCustomTime);
	const isEnableCustomCountLoad = useSelector(getEnabledCustomCountLoad);
	const isEnabledUI = useSelector(getEnabledParametersPanel);

	const handleSelectCustomTime = (item: IDropDownItem) => {
		if (item.key === DefaultTimeKeys.CUSTOM) {
			dispatch(toggleEnableCustomTime(true));
			return;
		}
		dispatch(updateTimeParameterThunk({
			days: +item.key,
		}));
		dispatch(toggleEnableCustomTime(false));
	};

	const handleSelectCustomCountLoad = (item: IDropDownItem) => {
		if (item.key === DefaultCountLoadKeys.CUSTOM) {
			dispatch(toggleEnableCustomCountLoad(true));
			return;
		}
		dispatch(updateCountLoadParameterThunk({
			countLoad: +item.key,
		}));
		dispatch(toggleEnableCustomCountLoad(false));
	};

	const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(updateTimeParameterThunk({
			days: +event.target.value,
		}));
	};

	const handleCountLoadChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(updateCountLoadParameterThunk({
			countLoad: +event.target.value,
		}));
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(updatePasswordParameterThunk({
			password: event.target.value,
		}));
	};

	const handlePasswordEnabledChange = async (change: boolean) => {
		if (change) {
			return;
		}
		dispatch(updatePasswordParameterThunk({
			password: '',
		}));
	};
	const handleDescriptionChange = (description: string) => {
		dispatch(updateDescriptionParameterThunk({
			description: description,
		}));
	};
	
	return (
		<footer
			style={isEnabledUI ? {} : {
				pointerEvents: 'none',
				opacity: 0.5
			}}
			className={`ParametersPanel ${className}`
			}>
			<div className='containerGridMain'>
				<div className='containerTitle'>
					<h2 className='title'>{t('Параметры')}</h2>
					<div className='separator'></div>
				</div>
				<div className='containerTime'>
					<Tooltip
						title={t('Время хранения файла')}
						enterDelay={500}
						leaveDelay={200}
						placement='top'
					>
						<img className={'img-parameter'} src={timeIcon} alt='timeIcon'/>
					</Tooltip>
					<DropDownMenuHover
						defaultSelectItem={DefaultTimeSelectItem}
						items={DefaultTimeItems}
						fnChanged={handleSelectCustomTime}
						className='TimeSelect'
					/>
				</div>
				<div className='containerCountLoad'>
					<Tooltip
						title={t('Количество скачиваний')}
						enterDelay={500}
						leaveDelay={200}
						placement='top'
					>
						<img className={'img-parameter'} src={countLoadIcon} alt='countLoadIcon'/>
					</Tooltip>
					<DropDownMenuHover
						defaultSelectItem={DefaultCountLoadSelectItem}
						items={DefaultCountLoadItems}
						fnChanged={handleSelectCustomCountLoad}/>
				</div>
				<div className='containerPassword'>
					<Tooltip
						title={t('Пароль для скачивания')}
						enterDelay={500}
						leaveDelay={200}
						placement='top'
					>
						<img className={'img-parameter'} src={passwordIcon} alt='passwordIcon'/>
					</Tooltip>
					<SwitchMUI
						onDispatchToggle={togglePassword}
						changeSelector={getPasswordEnabled}
						onChange={handlePasswordEnabledChange}
					/>
				</div>

				<div className='containerPasswordInput'>
					<div className={`passwordInput ${
						isPasswordEnable ? 'fade-in' : 'fade-out'
					}`}>
						<InputPasswordOutlinedMUI
							placeholder='пароль'
							onInputChange={handlePasswordChange}
						/>
					</div>
				</div>

				<div className={`containerTimeInput ${
					isEnableCustomTime ? 'fade-in' : 'fade-out'
				}`}>
					<InputOutlinedMUI
						startAdornment='дни'
						placeholder='кол-во'
						type='number'
						onInputChange={handleTimeChange}
					/>
				</div>
				<div className={`containerCountLoadInput ${
					isEnableCustomCountLoad ? 'fade-in' : 'fade-out'
				}`}>
					<InputOutlinedMUI
						startAdornment='скач-я'
						placeholder='кол-во'
						type='number'
						onInputChange={handleCountLoadChange}
					/>
				</div>

				<div className='ParametersPanelDescription'>
					<TextAreaDelayed
						timeChange={1500}
						onChangeDelayed={handleDescriptionChange}
						placeholder={t('Описание')}/>
				</div>
			</div>
		</footer>
	);
};