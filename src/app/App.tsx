import './styles/App.css';
import { Navbar } from '../widgets/navbar';
import './styles/globaVariables.scss';
import { ParametersPanel } from '../widgets/parameters-panel';
import DropZone from '../widgets/drop-zone/ui/DropZone';
import MainPage from '../widgets/main-page/ui/MainPage';
import { useAppDispatch } from '../store/types/useAppDispatch';
import { useEffect } from 'react';
import { initSession } from '../store/services/session/thunk/initSession';
import { updateLastActivity } from '../store/services/session/thunk/updateLastActivity';
import { QueryClient, QueryClientProvider } from 'react-query';
import { uploadFileThunk } from '../store/services/upload-files/thunks/uploadFileThunk';

const App = () => {
	const queryClient = new QueryClient();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initSession());

		const handleActivity = () => dispatch(updateLastActivity());

		window.addEventListener('click', handleActivity);
		window.addEventListener('keydown', handleActivity);

		return () => {
			window.removeEventListener('click', handleActivity);
			window.removeEventListener('keydown', handleActivity);
		};
	}, [dispatch]);

	const handleFiles = (files: File[]) => {
		// console.log('Полученные файлы:', files);
		files.forEach(file => {
			dispatch(uploadFileThunk({ file }));
		});
		// Здесь можно, например, загрузить файлы на сервер или отобразить их
	};
	
	const xx = () => {
		console.log('актив перетаскивания');
	};

	const xxx = () => {
		console.log('конец перетаскивания');
	};
	
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<Navbar/>
				<DropZone onFilesDropped={handleFiles} onDragStart={xx} onDragEnd={xxx}>
					<MainPage/>
				</DropZone>
				<ParametersPanel/>
			</div>
		</QueryClientProvider>
		
	);
};

export default App;
