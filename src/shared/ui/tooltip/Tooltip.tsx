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
}


export const Tooltip: FC<TooltipProps> = ({
	content,
	children,
	placement = 'top',
	delay = 150,
	className,
	style,
}) => {
	const [visible, setVisible] = useState(false);
	const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
	const timeoutRef = useRef<number | null>(null);

	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const tooltipRef = useRef<HTMLDivElement | null>(null);

	// вычисляем позицию
	const updatePosition = () => {
		if (!wrapperRef.current || !tooltipRef.current) return;

		const triggerRect = wrapperRef.current.getBoundingClientRect();
		const tooltipRect = tooltipRef.current.getBoundingClientRect();

		let top = 0, left = 0;

		switch (placement) {
		case 'Top':
			top = triggerRect.top - tooltipRect.height - 8;
			left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
			break;
		case 'Bottom':
			top = triggerRect.bottom + 8;
			left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
			break;
		case 'Left':
			top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
			left = triggerRect.left - tooltipRect.width - 8;
			break;
		case 'Right':
			top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
			left = triggerRect.right + 8;
			break;
		}

		setCoords({ top: top + window.scrollY, left: left + window.scrollX });
	};

	// показать с задержкой
	const show = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = window.setTimeout(() => {
			setVisible(true);
			updatePosition();
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
					className={classNames(styles.Tooltip, `Tooltip${placement}`, className)}
					style={{ top: coords.top, left: coords.left, ...style }}
				>
					{content}
				</div>
			)}
		</>
	);
};