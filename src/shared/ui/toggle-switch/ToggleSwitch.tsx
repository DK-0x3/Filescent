import { CSSProperties, FC, useState } from 'react';
import styles from './ToggleSwitch.module.scss';
import classNames from 'classnames';

/**
 * Props для компонента ToggleSwitch.
 */
type ToggleSwitchProps = {
    /** Текстовая метка, отображаемая рядом с переключателем */
    label?: string;
    /** Отключает переключатель, делает его неактивным */
    disabled?: boolean;
    /** Ширина переключателя (можно использовать любые CSS единицы, напр. '48px', '3rem') */
    width?: string;
    /** Высота переключателя (можно использовать любые CSS единицы) */
    height?: string;
    /** Callback при изменении состояния переключателя. Возвращает новое значение checked */
    onChange?: (checked: boolean) => void;
    /** Отступ вокруг "кнопки" внутри переключателя */
    knopPadding?: string;
    /** Дополнительные стили для кнопки переключателя */
    knopStyle?: CSSProperties;
    /** Дополнительные стили для фона переключателя */
    backgroundStyle?: CSSProperties;
    /** Цвет фона при включенном состоянии */
    backgroundColorChecked?: string;
    /** Стили заголовка */
    labelClassName?: string;
};

/**
 * Компонент ToggleSwitch — настраиваемый переключатель.
 *
 * Пример использования:
 * ```tsx
 * <ToggleSwitch
 *    label="Включено"
 *    width="60px"
 *    height="30px"
 *    knopPadding="3px"
 *    backgroundColorChecked="#009543"
 *    onChange={(checked) => console.log(checked)}
 * />
 * ```
 */
export const ToggleSwitch: FC<ToggleSwitchProps> = ({
	label,
	disabled = false,
	width = '48px',
	height = '24px',
	knopPadding = '4px',
	onChange,
	knopStyle,
	backgroundStyle,
	backgroundColorChecked = '#009543',
	labelClassName,
}) => {
	const [checked, setChecked] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	/**
     * Обработчик клика по переключателю.
     * Меняет состояние checked и вызывает onChange callback.
     */
	const handleClick = async () => {
		if (disabled || isProcessing) return;

		const next = !checked;

		setIsProcessing(true);
		setChecked(next);

		try {
			await Promise.resolve(onChange?.(next));
		} finally {
			setIsProcessing(false);
		}
	};

	/**
     * Стиль для фона переключателя.
     * Цвет меняется в зависимости от состояния checked.
     */
	const backgroundStyleResult: CSSProperties = {
		...backgroundStyle,
		width,
		height,
		backgroundColor: checked
			? backgroundColorChecked
			: (backgroundStyle?.backgroundColor ?? '#555'),
	};

	/** Размер кнопки внутри переключателя, учитывая отступ */
	const knobSize = `calc(${height} - (${knopPadding} * 2))`;

	/** Стиль для кнопки переключателя */
	const knobStyleResult: CSSProperties = {
		top: knopPadding,
		left: knopPadding,
		width: knobSize,
		height: knobSize,
		transform: checked
			? `translateX(calc(${width} - ${knobSize} - (${knopPadding} * 2)))`
			: 'translateX(0)',

		...knopStyle,
	};

	return (
		<label
			className={classNames(styles.wrapper, { [styles.Disable]: disabled })}
		>
			{label && <span className={classNames(styles.Title, labelClassName)}>{label}</span>}

			<div
				onClick={handleClick}
				className={styles.Background}
				style={backgroundStyleResult}
			>
				<div className={styles.Knop} style={knobStyleResult} />
			</div>
		</label>
	);
};
