import { ChangeEvent, FC, TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';
import './TextAreaDelayed.scss';

export interface ITextAreaDescriptionProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    onChangeDelayed?: (value: string) => void;
    timeChange?: number;
}

export const TextAreaDelayed: FC<ITextAreaDescriptionProps> = ({
	onChangeDelayed,
	timeChange = 500, // по умолчанию 500 мс
	...restProps
}) => {
	const [value, setValue] = useState(restProps.value?.toString() || '');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Обновляем состояние, если приходит новое значение извне
	useEffect(() => {
		if (restProps.value !== undefined) {
			setValue(restProps.value.toString());
		}
	}, [restProps.value]);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		setValue(newValue);

		// Вызываем оригинальный onChange, если он передан
		restProps.onChange?.(e);

		// Очищаем предыдущий таймер
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		// Запускаем таймер для отложенного вызова
		if (onChangeDelayed) {
			timeoutRef.current = setTimeout(() => {
				onChangeDelayed(newValue);
			}, timeChange);
		}
	};

	return (
		<textarea
			{...restProps}
			value={value}
			onChange={handleChange}
			className='TextAreaDelayed'
		/>
	);
};
