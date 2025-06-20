import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../../widgets/navbar';
import DropZone from '../../widgets/drop-zone/ui/DropZone';
import { ParametersPanel } from '../../widgets/parameters-panel';
import { Modal } from '../../widgets/modal/ui/Modal';
import { uploadFileThunk } from '../../store/services/upload-files/thunks/uploadFileThunk';
import { useAppDispatch } from '../../store/types/useAppDispatch';
import { useIsMobile } from '../../shared/hooks/useIsMobile';

const Layout = () => {
	const dispatch = useAppDispatch();
	const isMobile = useIsMobile();

	const handleFiles = (files: File[]) => {
		dispatch(uploadFileThunk({ files }));
	};

	const location = useLocation();

	return (
		<>
			<Navbar/>
			<DropZone onFilesDropped={handleFiles}>
				<Outlet/>
			</DropZone>
			{ location.pathname !== '/' ? <footer style={{ height: isMobile ? '0' : '300px' }}/> : <ParametersPanel/> }
			<Modal/>
		</>
	);
};
export default Layout;