import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { useModal } from '../model/ModalContext';
import { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

export const Modal: FC = () => {
	const { isOpen, closeModal, component } = useModal();
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setIsTransitioning(true);
		} else {
			setIsTransitioning(false);
		}
	}, [isOpen]);

	const handleCloseModal = () => {
		setIsTransitioning(false);
		setTimeout(() => {
			closeModal();
		}, 300);
	};

	if (!isOpen && !isTransitioning) return null;

	return createPortal(
		<div
			className={classNames(styles.ModalOverlay, {
				[styles.Open]: isTransitioning,
			})}
			onClick={handleCloseModal}
		>
			<div
				className={classNames(styles.ModalContent, {
					[styles.Open]: isTransitioning
				})}
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}
			>
				<button className={styles.ModalClose} onClick={handleCloseModal}>
					×
				</button>
				<div>{component}</div>
			</div>
		</div>,
		document.body
	);
};