import React, { useEffect, useId, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './DropDownListMenu.module.scss';
import Placement from './types/Placement';
import IDropdownItem from './types/IDropdownItem';
import ChevronDown from './assets/ChevronDownIcon';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

/**
 * Свойства компонента DropdownMenu
 *
 * @template ValueT - тип значения элементов меню
 */
export interface IDropdownMenuProps<ValueT> {
    /** Текст или элемент кнопки, открывающей меню */
    label?: React.ReactNode;
    /** Список элементов меню */
    items: IDropdownItem<ValueT>[];
    /** Функция вызывается при выборе элемента */
    onSelect?: (item: IDropdownItem<ValueT>) => void;
    /** Позиция меню относительно кнопки: 'top' | 'bottom' | 'left' | 'right' */
    placement?: Placement;

    /** Кастомизация внешнего контейнера */
    className?: string;
    style?: React.CSSProperties;
    /** Кастомизация кнопки открытия */
    buttonClassName?: string;
    buttonStyle?: React.CSSProperties;
    /** Кастомизация контейнера меню */
    menuClassName?: string;
    menuStyle?: React.CSSProperties;
    /** Кастомизация элементов меню */
    itemClassName?: string;
    itemStyle?: React.CSSProperties;

    /** Минимальная ширина меню */
    menuMinWidth?: number;

    /** Показывать ли выбранный элемент вместо label и выделять его в списке */
    showSelectedItem?: boolean;
    selectedItemClassName?: string;

    /** Предустановленное выбранное значение */
    initialSelectedItem?: IDropdownItem<ValueT>;

    /** Должна ли ширина меню соответствовать ширине кнопки */
    isMenuMatchButtonWidth?: boolean;
}


/**
 * Компонент DropdownMenu — выпадающее меню с поддержкой кастомизации,
 * позиционирования и управления клавиатурой.
 *
 * @template ValueT - тип значения элементов меню
 *
 * @example
 * ```tsx
 * const items = [
 *   { value: { id: 1 }, label: 'Первый', icon: <Icon1 /> },
 *   { value: { id: 2 }, label: 'Второй', disabled: true },
 * ];
 *
 * <DropdownMenu
 *   label="Выберите элемент"
 *   items={items}
 *   onSelect={(item) => console.log(item)}
 *   placement="bottom"
 * />
 * ```
 */
// 👇 Внеси изменения в существующий компонент

export const DropDownListMenu = <ValueT,>({
	label = 'Menu',
	items,
	onSelect,
	placement = 'Bottom',

	className,
	style,
	buttonClassName,
	buttonStyle,
	menuClassName,
	menuStyle,
	itemClassName,
	itemStyle,

	menuMinWidth = 180,

	showSelectedItem = true,
	selectedItemClassName = '',
	initialSelectedItem,
	isMenuMatchButtonWidth = false,
}: IDropdownMenuProps<ValueT>) => {
	const { t } = useTranslation();

	const [open, setOpen] = useState(false);
	const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
	const [selectedItem, setSelectedItem] = useState<IDropdownItem<ValueT> | null>(initialSelectedItem ?? null);
	const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
		initialSelectedItem ? items.findIndex(i => i === initialSelectedItem) : null
	);
	const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined);

	const rootRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const menuId = useId();

	// Закрытие меню при клике вне
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			// Если клик был вне компонента — закрываем, но с задержкой
			if (!rootRef.current?.contains(e.target as Node)) {
				// Даем времени отработать onClick
				setTimeout(() => {
					setOpen(false);
				}, 0);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	// Закрытие по Escape
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpen(false);
				buttonRef.current?.focus();
			}
		};
		if (open) document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open]);

	// Расчёт позиции меню
	useEffect(() => {
		if (open && buttonRef.current) {
			setButtonWidth(buttonRef.current.offsetWidth);

			const buttonRect = buttonRef.current.getBoundingClientRect();
			const scrollY = window.scrollY;
			const scrollX = window.scrollX;
			const menuEl = document.getElementById(menuId);

			if (!menuEl) return;

			// 👇 Дождемся следующего кадра, чтобы CSS width уже применился
			requestAnimationFrame(() => {
				const menuRect = menuEl.getBoundingClientRect();
				const offset = 8;

				let top = 0, left = 0;

				switch (placement) {
				case 'Bottom':
					top = buttonRect.bottom + scrollY + offset;
					left = buttonRect.left + scrollX + buttonRect.width / 2 - menuRect.width / 2;
					break;
				case 'Top':
					top = buttonRect.top + scrollY - menuRect.height - offset;
					left = buttonRect.left + scrollX + buttonRect.width / 2 - menuRect.width / 2;
					break;
				case 'Left':
					top = buttonRect.top + scrollY + buttonRect.height / 2 - menuRect.height / 2;
					left = buttonRect.left + scrollX - menuRect.width - offset;
					break;
				case 'Right':
					top = buttonRect.top + scrollY + buttonRect.height / 2 - menuRect.height / 2;
					left = buttonRect.right + scrollX + offset;
					break;
				}

				const viewportWidth = window.innerWidth;
				const viewportHeight = window.innerHeight;

				if (left < 0) left = 4;
				if (left + menuRect.width > viewportWidth) left = viewportWidth - menuRect.width - 4;
				if (top < 0) top = 4;
				if (top + menuRect.height > viewportHeight + scrollY)
					top = viewportHeight + scrollY - menuRect.height - 4;

				setMenuPos({ top, left });
			});
		}
	}, [open, placement, menuId, buttonWidth]);

	const menuContent = (
		<ul
			id={menuId}
			role="menu"
			aria-label="Dropdown menu"
			className={classNames(
				styles.Menu,
				styles[`Placement${placement}`],
				menuClassName,
				{ [styles.Open]: open }
			)}
			style={{
				top: menuPos.top,
				left: menuPos.left,
				minWidth: menuMinWidth,
				width: isMenuMatchButtonWidth ? buttonWidth : undefined,
				...menuStyle,
			}}
		>
			{items.map((item, idx) => {
				const itemId = `dropdown-item-${idx}`;
				const isSelected = showSelectedItem && selectedItem && selectedItemIndex === idx;

				return (
					<li key={itemId} role="none">
						<button
							ref={(el) => void (itemRefs.current[idx] = el)}
							role="menuitem"
							type="button"
							aria-disabled={item.disabled || undefined}
							disabled={item.disabled}
							className={classNames(
								styles.Item,
								itemClassName,
								{
									[styles.Selected]: showSelectedItem && isSelected,
									[selectedItemClassName!]: showSelectedItem && isSelected && selectedItemClassName,
								}
							)}
							style={itemStyle}
							onClick={() => {
								if (item.disabled) return;
								setSelectedItem(item);
								setSelectedItemIndex(idx);
								onSelect?.(item);
								setOpen(false);
								buttonRef.current?.focus();
							}}
						>
							{item.icon && <span aria-hidden>{item.icon}</span>}
							<span>{typeof item.label === 'string' ? t(item.label) : item.label}</span>
						</button>
					</li>
				);
			})}
		</ul>
	);

	return (
		<div
			ref={rootRef}
			className={classNames(styles.Wrapper, className)}
			style={{ display: 'inline-block', ...style }}
		>
			<button
				ref={buttonRef}
				type="button"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={menuId}
				className={classNames(styles.MainButton, buttonClassName)}
				style={{ ...buttonStyle }}
				onClick={() => setOpen((p) => !p)}
			>
				{showSelectedItem && selectedItem
					? typeof selectedItem.label === 'string' ? t(selectedItem.label) : selectedItem.label
					: label}
				<ChevronDown rotated={open} />
			</button>

			{ReactDOM.createPortal(menuContent, document.body)}
		</div>
	);
};

