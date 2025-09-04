import IDropdownItem from '../../../shared/ui/drop-down-list-menu/types/IDropdownItem';

export enum DefaultTimeKeys {
	ONE = '1',
	THREE = '3',
	SEVEN = '7',
	FOURTEEN = '14',
	THIRTY = '365',
	CUSTOM = 'custom',
}

export interface IDropDownItemTimesValue {
    key: DefaultTimeKeys,
}

export const DefaultTimeItems: IDropdownItem<IDropDownItemTimesValue>[] = [
	{
		value: {
			key: DefaultTimeKeys.ONE,
		},
		label: '1 день',
	},
	{
		value: {
			key: DefaultTimeKeys.THREE,
		},
		label: '3 дня',
	},
	{
		value: {
			key: DefaultTimeKeys.SEVEN,
		},
		label: '7 дней',
	},
	{
		value: {
			key: DefaultTimeKeys.FOURTEEN,
		},
		label: '14 дней',
	},
	{
		value: {
			key: DefaultTimeKeys.THIRTY,
		},
		label: '1 год',
	},
	{
		value: {
			key: DefaultTimeKeys.CUSTOM,
		},
		label: 'Свое',
	},
];

export const DefaultTimeSelectItem = DefaultTimeItems[4];