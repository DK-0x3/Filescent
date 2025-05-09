import { IDropDownItem } from '../../../shared/ui/drop-down-menu-hover/interface/IDropDownItem';

export enum DefaultTimeKeys {
	ONE = '1',
	THREE = '3',
	SEVEN = '7',
	FOURTEEN = '14',
	THIRTY = '365',
	CUSTOM = 'custom',
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
		text: '1 год',
	},
	{
		key: DefaultTimeKeys.CUSTOM,
		text: 'Свое',
	},
];

export const DefaultTimeSelectItem: IDropDownItem = DefaultTimeItems[4];