import { MouseEventHandler, useEffect, useRef } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';

export interface IQRCodeProps {
	text: string;
	size: number;
	cursor?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	padding?: number;
	options?: Partial<Options>;
}

/**
 * Компонент QR кода
 * @constructor
 */
const QRCode = (props: IQRCodeProps) => {
	const qrCodeRef = useRef<HTMLDivElement | null>(null);

	const {
		text,
		size,
		padding = 10,
		options,
		onClick,
		cursor = 'auto'
	} = props;

	useEffect(() => {
		const qrCode = new QRCodeStyling({
			width: size,
			height: size,
			type: 'svg',
			data: text,
			shape: 'square',
			cornersSquareOptions: {
				type: 'classy',
			},
			dotsOptions: {
				type: 'rounded',
				gradient: {
					type: 'linear',
					rotation: 45,
					colorStops: [
						{ offset: 0, color: '#86C232' },
						{ offset: 0.67, color: '#86C232' },
						{ offset: 1, color: '#61892F' },
					],
				},
			},
			backgroundOptions: {
				round: 0.1,
				color: '#2D3031',
			},
			margin: padding,
			...options,
		});

		// Если контейнер доступен, добавляем QR-код в div
		if (qrCodeRef.current) {
			qrCode.append(qrCodeRef.current);
			qrCodeRef.current.style.cursor = cursor;
		}

		// Очистка при размонтировании компонента
		return () => {
			if (qrCodeRef.current) {
				qrCodeRef.current.innerHTML = '';
			}
		};
	}, [text, size, padding, options, cursor]);

	return (
		<div
			ref={qrCodeRef}
			onClick={onClick}
		/>
	);
};

export default QRCode;