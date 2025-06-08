class Utils {
	public formatFileSize = (sizeInBytes: number): string => {
		const kb = 1024;
		const mb = kb * 1024;
		const gb = mb * 1024;

		if (sizeInBytes >= gb) {
			return (sizeInBytes / gb).toFixed(2) + ' GB';
		} else if (sizeInBytes >= mb) {
			return (sizeInBytes / mb).toFixed(2) + ' MB';
		} else if (sizeInBytes >= kb) {
			return (sizeInBytes / kb).toFixed(2) + ' KB';
		} else {
			return sizeInBytes + ' B';
		}
	};

	public getExtensionFromMime = (mime: string): string | undefined => {
		const map: Record<string, string> = {
			'image/jpeg': 'jpg',
			'image/png': 'png',
			'application/pdf': 'pdf',
			'text/plain': 'txt',
			'application/zip': 'zip',
		};

		return map[mime];
	};

	public formatEtaVerbose = (seconds: number): string => {
		if (!isFinite(seconds) || seconds < 0) return '—';

		const hrs = Math.floor(seconds / 3600);
		const mins = Math.floor((seconds % 3600) / 60);
		const secs = Math.floor(seconds % 60);

		const parts: string[] = [];
		if (hrs > 0) parts.push(`${hrs} ${this.decline(hrs, 'час', 'часа', 'часов')}`);
		if (mins > 0) parts.push(`${mins} ${this.decline(mins, 'минута', 'минуты', 'минут')}`);
		if (secs > 0 || parts.length === 0) parts.push(`${secs} ${this.decline(secs, 'секунда', 'секунды', 'секунд')}`);

		return parts.join(' ');
	};

	private decline = (n: number, one: string, few: string, many: string): string => {
		const nAbs = Math.abs(n) % 100;
		const n1 = nAbs % 10;

		if (nAbs > 10 && nAbs < 20) return many;
		if (n1 > 1 && n1 < 5) return few;
		if (n1 === 1) return one;
		return many;
	};

	public formatSpeed = (bytesPerSecond: number): string => {
		if (!isFinite(bytesPerSecond) || bytesPerSecond < 0) return '—';

		const units = ['Б/с', 'KB/s', 'MB/s', 'GB/s', 'TB/s'];
		let i = 0;
		let speed = bytesPerSecond;

		while (speed >= 1024 && i < units.length - 1) {
			speed /= 1024;
			i++;
		}

		return `${speed.toFixed(1)} ${units[i]}`;
	};
}

export const UTILS = new Utils();