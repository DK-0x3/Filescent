class FileUtils {
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
}

export const FILE_UTILS = new FileUtils();