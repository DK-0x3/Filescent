import { IDropDownItem } from '../../../shared/ui/drop-down-menu-hover/interface/IDropDownItem';

export enum DefaultCountLoadKeys {
	INFINITY = '365',
	ONE = '1',
	THREE = '3',
	FIVE = '5',
	TEN = '10',
	CUSTOM = 'custom',
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
