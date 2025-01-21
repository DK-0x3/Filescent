import './ParametersPanel.scss';
import { useTranslation } from 'react-i18next';
import timeIcon from '../../../shared/assets/svg/time.svg';
import countLoadIcon from '../../../shared/assets/svg/countLoad.svg';
import passwordIcon from '../../../shared/assets/svg/password.svg';
import {DropDownList, IDropDownItem} from "../../../shared/ui/dropDownList/DropDownList.tsx";
import {InputApp} from "../../../shared/ui/input/InputApp.tsx";
import {DropDownMenuHover} from "../../../shared/ui/dropDownMenuHover/DropDownMenuHover.tsx";
import {InputOutlinedMUI} from "../../../shared/ui/inputOutlinedMUI/InputOutlinedMUI.tsx";
import {Switch} from "@mui/material";
import {SwitchMUI} from "../../../shared/ui/switchMUI/switchMUI.tsx";

interface IParametersPanelProps {
    className?: string;
}

export const ParametersPanel = (props: IParametersPanelProps) => {
	const { t } = useTranslation();

	const {
		className,
	} = props;

	const defaultTimeListItems: IDropDownItem[] = [
		{
			key: 'time1d',
			text: '1 день',
		},
		{
			key: 'time3d',
			text: '3 дня',
		},
		{
			key: 'time7d',
			text: '7 дней',
		},
		{
			key: 'time14d',
			text: '14 дней',
		},
		{
			key: 'time30d',
			text: '30 дней',
		},
		{
			key: 'timeOwn',
			text: 'Свое',
		},
	];

	const defaultCountLoadListItems: IDropDownItem[] = [
		{
			key: 'countLoadInfinity',
			text: 'Бесконечно',
		},
		{
			key: 'countLoad1',
			text: '1 скач-е',
		},
		{
			key: 'countLoad3',
			text: '3 скач-я',
		},
		{
			key: 'countLoad5',
			text: '5 скач-й',
		},
		{
			key: 'countLoad10',
			text: '10 скач-й',
		},
		{
			key: 'countLoadOwn',
			text: 'Свое',
		},
	];

	return (
		<footer className={`ParametersPanel ${className}`}>
			<div className='containerGridMain'>
				<div className='containerTitle'>
					<h2 className='title'>{t('Параметры')}</h2>
					<div className='separator'></div>
				</div>
				<div className='containerTime'>
					<img src={timeIcon} alt='time'/>
					<DropDownMenuHover
						fnChanged={() => void {}}
						defaultItem={defaultTimeListItems[0]}
						items={defaultTimeListItems}/>
				</div>
				<div className='containerCountLoad'>
					<img src={countLoadIcon} alt='time'/>
					<DropDownMenuHover
						fnChanged={() => void {}}
						defaultItem={defaultCountLoadListItems[0]}
						items={defaultCountLoadListItems}/>
				</div>
				<div className='containerPassword'>
					<img src={passwordIcon} alt='time'/>
					<SwitchMUI/>
				</div>
				<div className='containerPasswordInput'>
					<InputOutlinedMUI placeholder='пароль'/>
				</div>
			</div>
		</footer>
	);
};