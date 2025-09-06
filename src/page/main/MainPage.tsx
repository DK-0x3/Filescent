import FileUploadIdle from '../../widgets/file-upload-idle/ui/FileUploadIdle';
import { useSelector } from 'react-redux';
import { getUploadGlobalStatus } from '../../store/services/upload-files/selectors/getUploadGlobalStatus';
import { UploadStatus } from '../../store/services/upload-files/types/UploadStatus';
import FileUploadLoading from '../../widgets/file-upload-loading/ui/FileUploadLoading';
import FileUploadSuccess from '../../widgets/file-upload-success/ui/FileUploadSuccess';
import FileUploadError from '../../widgets/file-upload-error/ui/FileUploadError';

const MainPage = () => {
	const globalStatus = useSelector(getUploadGlobalStatus);

	let content;

	switch (globalStatus) {
	case UploadStatus.IDLE:
		content = <FileUploadIdle />;
		break;
	case UploadStatus.LOADING:
		content = <FileUploadLoading />;
		break;
	case UploadStatus.SUCCESS:
		content = <FileUploadSuccess />;
		break;
	case UploadStatus.ERROR:
		content = <FileUploadError />;
		break;
	default:
		content = null;
	}

	return content;
};

export default MainPage;