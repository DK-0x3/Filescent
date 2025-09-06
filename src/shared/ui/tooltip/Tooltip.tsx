import styles from './Tooltip.module.scss';
import { CSSProperties, FC, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import Placement from '../drop-down-list-menu/types/Placement';
import classNames from 'classnames';

export interface TooltipProps {
    /** Контент тултипа */
    content: ReactNode;
    /** Элемент-триггер */
    children: ReactElement;
    /** Позиция */
    placement?: Placement;
    /** Задержка появления в мс */
    delay?: number;
    /** Кастомный класс */
    className?: string;
    /** Inline-стили тултипа */
    style?: CSSProperties;
    /** Отступ от родителя */
    offset?: number;
}

export const Tooltip: FC<TooltipProps> = ({
	content,
	children,
	placement = 'Top',
	delay = 150,
	className,
	style,
	offset = 8,
}) => {
	const [visible, setVisible] = useState(false);
	const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
	const timeoutRef = useRef<number | null>(null);

	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const tooltipRef = useRef<HTMLDivElement | null>(null);

	const updatePosition = () => {
		if (!wrapperRef.current || !tooltipRef.current) return;

		const triggerRect = wrapperRef.current.getBoundingClientRect();
		const tooltipRect = tooltipRef.current.getBoundingClientRect();

		let top = 0, left = 0;

		switch (placement) {
		case 'Top':
			top = triggerRect.top - tooltipRect.height - offset;
			left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
			break;
		case 'Bottom':
			top = triggerRect.bottom + offset;
			left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
			break;
		case 'Left':
			top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
			left = triggerRect.left - tooltipRect.width - offset;
			break;
		case 'Right':
			top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
			left = triggerRect.right + offset;
			break;
		}

		top += window.scrollY;
		left += window.scrollX;

		const { innerWidth, innerHeight, scrollX, scrollY } = window;

		// левая и верхняя границы
		if (left < scrollX) left = scrollX + 5;
		if (top < scrollY) top = scrollY + 5;

		// правая и нижняя границы
		if (left + tooltipRect.width > scrollX + innerWidth) {
			left = scrollX + innerWidth - tooltipRect.width - 5;
		}
		if (top + tooltipRect.height > scrollY + innerHeight) {
			top = scrollY + innerHeight - tooltipRect.height - 5;
		}

		setCoords({ top, left });
	};

	// показать с задержкой
	const show = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = window.setTimeout(() => {
			setVisible(true); // сначала просто показать
		}, delay);
	};

	// скрыть
	const hide = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setVisible(false);
	};

	// обновляем позицию при ресайзе/скролле
	useEffect(() => {
		if (!visible) return;

		const handleScroll = () => updatePosition();
		window.addEventListener('scroll', handleScroll, true);
		window.addEventListener('resize', handleScroll);

		// ⬇️ Вызовем после отрисовки тултипа
		updatePosition();

		return () => {
			window.removeEventListener('scroll', handleScroll, true);
			window.removeEventListener('resize', handleScroll);
		};
	}, [visible]);

	return (
		<>
			<div
				ref={wrapperRef}
				onMouseEnter={show}
				onMouseLeave={hide}
				style={{ display: 'inline-block' }}
			>
				{children}
			</div>

			{visible && (
				<div
					ref={tooltipRef}
					className={classNames(
						styles.Tooltip,
						styles[`Tooltip${placement}`],
						{ [styles.TooltipShow]: visible },
						className
					)}
					style={{
						visibility: visible ? 'visible' : 'hidden',
						top: coords.top,
						left: coords.left,
						...style,
					}}
				>
					{content}
				</div>
			)}
		</>
	);
};