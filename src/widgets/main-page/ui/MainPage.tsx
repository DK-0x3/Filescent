import { useAppDispatch } from '../../../store/types/useAppDispatch';
import FileUploadIdle from '../../file-upload-idle/ui/FileUploadIdle';

const MainPage = () => {
	const dispatch = useAppDispatch();
	
	return (
		// <div style={{ height: '100px', width: '100%', gridRow: '2', backgroundColor: 'red' }}></div>
		<FileUploadIdle/>
	);
};

export default MainPage;