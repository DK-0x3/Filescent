import { FC, useCallback, useState, DragEvent, useEffect, ReactNode } from 'react';
import styles from './DropZone.module.scss';

interface IDropZoneProps {
	onFilesDropped: (files: File[]) => void;
	isEnabled?: boolean;
	children?: ReactNode,
	onDragStart?: () => void; // Ваш дополнительный метод подписчика
	onDragEnd?: () => void;   // Ваш дополнительный метод подписчика
}

const DropZone: FC<IDropZoneProps> = (props: IDropZoneProps) => {
	const {
		onFilesDropped,
		onDragStart,
		onDragEnd,
		children,
		isEnabled = true,
	} = props;

	const [isDragging, setIsDragging] = useState(false);

	const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
		if (!isEnabled) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
		if (!isEnabled) {
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	}, []);

	const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
		if (!isEnabled) {
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const files = Array.from(e.dataTransfer.files);
		if (files.length > 0) {
			onFilesDropped(files);
		}
	}, [onFilesDropped]);

	useEffect(() => {
		if (isDragging && onDragStart) {
			onDragStart();  // Вызов метода при начале перетаскивания
		}

		if (!isDragging && onDragEnd) {
			onDragEnd();  // Вызов метода при завершении перетаскивания
		}
	}, [isDragging, onDragStart, onDragEnd]);

	return (
		<div
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			style={{
				textAlign: 'center',
				transition: 'background-color 0.3s',
			}}
			className={styles.DropZone}
		>
			{children}
		</div>
	);
};

export default DropZone;
