import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

const QRCodeComponent = () => {
	const qrCodeRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const qrCode = new QRCodeStyling({
			width: 300,
			height: 300,
			type: 'svg',
			data: 'https://example.com',
			shape: 'square',
			// настройка 3 больших квадратов
			cornersSquareOptions: {
				type: 'classy'
			},
			dotsOptions: {
				type: 'rounded',
				gradient: {
					type: 'linear', // Тип градиента
					rotation: 45,   // Угол градиента
					colorStops: [
						{ offset: 0, color: '#86C232' }, // Цвет 1 (начало градиента)
						{ offset: 0.67, color: '#86C232' }, // Цвет 1 занимает 2/3
						{ offset: 1, color: '#61892F' }  // Цвет 2 (конец градиента)
					]
				}
			},
			backgroundOptions: {
				round: 0.1,
				color: '#2D3031'
			},
			margin: 20,

		});

		// Если контейнер доступен, добавляем QR-код в div
		if (qrCodeRef.current) {
			qrCode.append(qrCodeRef.current);
		}

		// Очистка при размонтировании компонента
		return () => {
			if (qrCodeRef.current) {
				qrCodeRef.current.innerHTML = '';
			}
		};
	}, []);

	return <div ref={qrCodeRef} />;
};

export default QRCodeComponent;
