import styles from './ParametersPanel.module.scss';
import { useTranslation } from 'react-i18next';
import timeIcon from '../../../shared/assets/svg/time.svg';
import countLoadIcon from '../../../shared/assets/svg/countLoad.svg';
import passwordIcon from '../../../shared/assets/svg/password.svg';
import { useSelector } from 'react-redux';
import { getPasswordEnabled } from '../../../store/services/parameters-settings/selectors/getPasswordEnabled';
import {
	setEnableCustomCountLoad,
	setEnableCustomTime,
	setIsEnablePassword
} from '../../../store/services/parameters-settings/parametersSettingsSlice';
import {
	DefaultTimeItems,
	DefaultTimeKeys,
	DefaultTimeSelectItem,
	IDropDownItemTimesValue
} from '../types/DefaultTimeItems';
import {
	DefaultCountLoadItems,
	DefaultCountLoadKeys,
	DefaultCountLoadSelectItem, ICountLoadValue
} from '../types/DefaultCountLoadItems';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { getEnabledCustomTime } from '../../../store/services/parameters-settings/selectors/getEnabledCustomTime';
import {
	getEnabledCustomCountLoad
} from '../../../store/services/parameters-settings/selectors/getEnabledCustomCountLoad';
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
import { InputApp } from '../../../shared/ui/input/InputApp';
import { DropDownListMenu } from '../../../shared/ui/drop-down-list-menu/DropDownListMenu';
import IDropdownItem from '../../../shared/ui/drop-down-list-menu/types/IDropdownItem';
import classNames from 'classnames';
import { ToggleSwitch } from '../../../shared/ui/toggle-switch/ToggleSwitch';
import { Tooltip } from '../../../shared/ui/tooltip/Tooltip';

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

	const handleSelectCustomTime = (item: IDropdownItem<IDropDownItemTimesValue>) => {
		if (item.value.key === DefaultTimeKeys.CUSTOM) {
			dispatch(setEnableCustomTime(true));
			return;
		}
		dispatch(updateTimeParameterThunk({
			days: +item.value.key,
		}));
		dispatch(setEnableCustomTime(false));
	};

	const handleSelectCustomCountLoad = (item: IDropdownItem<ICountLoadValue>) => {
		if (item.value.key === DefaultCountLoadKeys.CUSTOM) {
			dispatch(setEnableCustomCountLoad(true));
			return;
		}
		dispatch(updateCountLoadParameterThunk({
			countLoad: +item.value.key,
		}));
		dispatch(setEnableCustomCountLoad(false));
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
		dispatch(setIsEnablePassword(change));
        
		if (!change) {
			dispatch(updatePasswordParameterThunk({
				password: '',
			}));
		}
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
			className={classNames(styles.ParametersPanel, className)}
		>
			<div className={styles.ContainerGridMain}>
				<div className={styles.ContainerTitle}>
					<h2 className={styles.Title}>{t('Параметры')}</h2>
					<div className={styles.Separator}></div>
				</div>
				<div className={styles.ContainerTime}>
					{/*<Tooltip content="Я сверху!" placement="top">*/}
					{/*	<button>Наведи (top)</button>*/}
					{/*</Tooltip>*/}
					{/*<Tooltip*/}

					{/*	title={t('Время хранения файла')}*/}
					{/*	enterDelay={500}*/}
					{/*	leaveDelay={200}*/}
					{/*	placement='top'*/}
					{/*>*/}
					{/*	<img className={styles.ImgParameter} src={timeIcon} alt='timeIcon'/>*/}
					{/*</Tooltip>*/}
					<DropDownListMenu
						items={DefaultTimeItems}
						initialSelectedItem={DefaultTimeSelectItem}
						onSelect={handleSelectCustomTime}
						className={styles.TimeSelect}
						buttonClassName={styles.ButtonSelect}
						menuClassName={styles.Menu}
						selectedItemClassName={styles.Select}
						itemClassName={styles.Item}
						isMenuMatchButtonWidth
					/>
				</div>
				<div className={styles.ContainerCountLoad}>
					{/*<Tooltip*/}
					{/*	title={t('Количество скачиваний')}*/}
					{/*	enterDelay={500}*/}
					{/*	leaveDelay={200}*/}
					{/*	placement='top'*/}
					{/*>*/}
					{/*	<img className={styles.ImgParameter} src={countLoadIcon} alt='countLoadIcon'/>*/}
					{/*</Tooltip>*/}
					<DropDownListMenu
						items={DefaultCountLoadItems}
						initialSelectedItem={DefaultCountLoadSelectItem}
						onSelect={handleSelectCustomCountLoad}
						className={styles.TimeSelect}
						buttonClassName={styles.ButtonSelect}
						menuClassName={styles.Menu}
						selectedItemClassName={styles.Select}
						itemClassName={styles.Item}
						isMenuMatchButtonWidth
					/>
				</div>
				<div className={styles.ContainerPassword}>
					{/*<Tooltip*/}
					{/*	title={t('Пароль для скачивания')}*/}
					{/*	enterDelay={500}*/}
					{/*	leaveDelay={200}*/}
					{/*	placement='top'*/}
					{/*>*/}
					{/*	<img className={styles.ImgParameter} src={passwordIcon} alt='passwordIcon'/>*/}
					{/*</Tooltip>*/}
					<ToggleSwitch
						onChange={handlePasswordEnabledChange}
						backgroundColorChecked='var(--green-light)'
					/>
				</div>

				<div className={styles.ContainerPasswordInput}>
					<div className={classNames(styles.PasswordContainerInput, {
						[styles.FadeIn]: isPasswordEnable,
						[styles.FadeOut]: !isPasswordEnable,
					})
					}>
						<InputApp
							type='password'
							onChange={handlePasswordChange}
							placeholder='пароль'
							className={styles.PasswordInput}
						/>
					</div>
				</div>

				<div className={classNames(styles.ContainerTimeInput, {
					[styles.FadeIn]: isEnableCustomTime,
					[styles.FadeOut]: !isEnableCustomTime,
				})
				}>
					<InputApp
						type='number'
						onChange={handleTimeChange}
						placeholder='дни'
						className={styles.TimeInput}
					/>
				</div>
				<div className={classNames(styles.ContainerCountLoadInput, {
					[styles.FadeIn]: isEnableCustomCountLoad,
					[styles.FadeOut]: !isEnableCustomCountLoad,
				})
				}>
					<InputApp
						type='number'
						onChange={handleCountLoadChange}
						placeholder='скачивания'
						className={styles.CountloadInput}
					/>
				</div>

				<div className={styles.ParametersPanelDescription}>
					<TextAreaDelayed
						timeChange={1500}
						onChangeDelayed={handleDescriptionChange}
						placeholder={t('Описание')}/>
				</div>
			</div>
		</footer>
	);
};