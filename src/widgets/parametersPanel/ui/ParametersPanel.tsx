import './ParametersPanel.scss';
import { useTranslation } from 'react-i18next';
import timeIcon from '../../../shared/assets/svg/time.svg';
import countLoadIcon from '../../../shared/assets/svg/countLoad.svg';
import passwordIcon from '../../../shared/assets/svg/password.svg';
import { DropDownMenuHover } from '../../../shared/ui/drop-down-menu-hover/DropDownMenuHover';
import { SwitchMUI } from '../../../shared/ui/switch-mui/switchMUI';
import { InputPasswordOutlinedMUI } from '../../../shared/ui/input-password-outlined-mui/InputPasswordOutlinedMUI';
import { useSelector } from 'react-redux';
import { getPasswordEnabled } from '../../../store/services/parametersSettings/selectors/getPasswordEnabled';
import {
	toggleEnableCustomCountLoad,
	toggleEnableCustomTime,
	togglePassword
} from '../../../store/services/parametersSettings/parametersSettingsSlice';
import { DefaultTimeItems, DefaultTimeKeys, DefaultTimeSelectItem } from '../types/DefaultTimeItems';
import {
	DefaultCountLoadItems,
	DefaultCountLoadKeys,
	DefaultCountLoadSelectItem } from '../types/DefaultCountLoadItems';
import { IDropDownItem } from '../../../shared/ui/drop-down-menu-hover/interface/IDropDownItem';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { InputOutlinedMUI } from '../../../shared/ui/input-outlined-mui/InputOutlinedMUI';
import { getEnabledCustomTime } from '../../../store/services/parametersSettings/selectors/getEnabledCustomTime';
import {
	getEnabledCustomCountLoad
} from '../../../store/services/parametersSettings/selectors/getEnabledCustomCountLoad';
import { Tooltip } from '@mui/material';

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

	const handleSelectCustomTime = (item: IDropDownItem) => {
		if (item.key === DefaultTimeKeys.CUSTOM) {
			dispatch(toggleEnableCustomTime(true));
			return;
		}
		dispatch(toggleEnableCustomTime(false));
	};
	const handleSelectCustomCountLoad = (item: IDropDownItem) => {
		if (item.key === DefaultCountLoadKeys.CUSTOM) {
			dispatch(toggleEnableCustomCountLoad(true));
			return;
		}
		dispatch(toggleEnableCustomCountLoad(false));
	};
	
	return (
		<footer className={`ParametersPanel ${className}`}>
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
						fnChanged={handleSelectCustomTime}/>
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
					/>
				</div>
				<div className={`containerPasswordInput ${
					isPasswordEnable ? 'fade-in' : 'fade-out'
				}`}>
					<InputPasswordOutlinedMUI placeholder='пароль'/>
				</div>
				<div className={`containerTimeInput ${
					isEnableCustomTime ? 'fade-in' : 'fade-out'
				}`}>
					<InputOutlinedMUI
						startAdornment='дни'
						placeholder='кол-во'
						type='number'/>
				</div>
				<div className={`containerCountLoadInput ${
					isEnableCustomCountLoad ? 'fade-in' : 'fade-out'
				}`}>
					<InputOutlinedMUI
						startAdornment='скач-я'
						placeholder='кол-во'
						type='number'/>
				</div>
			</div>
		</footer>
	);
};