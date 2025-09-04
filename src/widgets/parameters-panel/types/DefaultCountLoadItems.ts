import IDropdownItem from '../../../shared/ui/drop-down-list-menu/types/IDropdownItem';

export enum DefaultCountLoadKeys {
	INFINITY = '365',
	ONE = '1',
	THREE = '3',
	FIVE = '5',
	TEN = '10',
	CUSTOM = 'custom',
}

export interface ICountLoadValue {
    key: DefaultCountLoadKeys,
}

export const DefaultCountLoadItems: IDropdownItem<ICountLoadValue>[] = [
	{
		value: {
			key: DefaultCountLoadKeys.INFINITY,
		},
		label: 'Бесконечно',
	},
	{
		value: {
			key: DefaultCountLoadKeys.ONE,
		},
		label: '1 скач-е',
	},
	{
		value: {
			key: DefaultCountLoadKeys.THREE,
		},
		label: '3 скач-я',
	},
	{
		value: {
			key: DefaultCountLoadKeys.FIVE,
		},
		label: '5 скач-й',
	},
	{
		value: {
			key: DefaultCountLoadKeys.TEN,
		},
		label: '10 скач-й',
	},
	{
		value: {
			key: DefaultCountLoadKeys.CUSTOM,
		},
		label: 'Свое',
	},
];

export const DefaultCountLoadSelectItem = DefaultCountLoadItems[0];
