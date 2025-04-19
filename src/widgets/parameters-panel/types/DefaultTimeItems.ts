import { IDropDownItem } from '../../../shared/ui/drop-down-menu-hover/interface/IDropDownItem';

export enum DefaultTimeKeys {
	ONE = 'time_1d',
	THREE = 'time_3d',
	SEVEN = 'time_7d',
	FOURTEEN = 'time_14d',
	THIRTY = 'time_30d',
	CUSTOM = 'time_Custom',
}

export const DefaultTimeItems: IDropDownItem[] = [
	{
		key: DefaultTimeKeys.ONE,
		text: '1 день',
	},
	{
		key: DefaultTimeKeys.THREE,
		text: '3 дня',
	},
	{
		key: DefaultTimeKeys.SEVEN,
		text: '7 дней',
	},
	{
		key: DefaultTimeKeys.FOURTEEN,
		text: '14 дней',
	},
	{
		key: DefaultTimeKeys.THIRTY,
		text: '30 дней',
	},
	{
		key: DefaultTimeKeys.CUSTOM,
		text: 'Свое',
	},
];

export const DefaultTimeSelectItem: IDropDownItem = DefaultTimeItems[0];