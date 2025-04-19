import { IDropDownItem } from '../../../shared/ui/drop-down-menu-hover/interface/IDropDownItem';

export enum DefaultCountLoadKeys {
	INFINITY = 'countLoad_Infinity',
	ONE = 'countLoad_1',
	THREE = 'countLoad_3',
	FIVE = 'countLoad_5',
	TEN = 'countLoad_10',
	CUSTOM = 'countLoad_Custom',
}

export const DefaultCountLoadItems: IDropDownItem[] = [
	{
		key: DefaultCountLoadKeys.INFINITY,
		text: 'Бесконечно',
	},
	{
		key: DefaultCountLoadKeys.ONE,
		text: '1 скач-е',
	},
	{
		key: DefaultCountLoadKeys.THREE,
		text: '3 скач-я',
	},
	{
		key: DefaultCountLoadKeys.FIVE,
		text: '5 скач-й',
	},
	{
		key: DefaultCountLoadKeys.TEN,
		text: '10 скач-й',
	},
	{
		key: DefaultCountLoadKeys.CUSTOM,
		text: 'Свое',
	},
];

export const DefaultCountLoadSelectItem: IDropDownItem = DefaultCountLoadItems[0];
