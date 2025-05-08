import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../../widgets/navbar';
import DropZone from '../../widgets/drop-zone/ui/DropZone';
import { ParametersPanel } from '../../widgets/parameters-panel';
import { Modal } from '../../widgets/modal/ui/Modal';
import { uploadFileThunk } from '../../store/services/upload-files/thunks/uploadFileThunk';
import { useAppDispatch } from '../../store/types/useAppDispatch';

const Layout = () => {
	const dispatch = useAppDispatch();

	const handleFiles = (files: File[]) => {
		files.forEach(file => {
			dispatch(uploadFileThunk({ file }));
		});
	};

	const location = useLocation();

	return (
		<>
			<Navbar/>
			<DropZone onFilesDropped={handleFiles}>
				<Outlet/>
			</DropZone>
			{ location.pathname !== '/' ? <footer style={{ height: '300px' }}/> : <ParametersPanel/> }
			<Modal/>
		</>
	);
};
export default Layout;