import './styles/App.css';
import './styles/globaVariables.scss';
import { useAppDispatch } from '../store/types/useAppDispatch';
import { useEffect } from 'react';
import { initSession } from '../store/services/session/thunk/initSession';
import { updateLastActivity } from '../store/services/session/thunk/updateLastActivity';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from '../widgets/modal/ui/ModalContext';
import AppRouter from './routing/AppRouter';

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
	
	return (
		<QueryClientProvider client={queryClient}>
			<ModalProvider>
				<div className="App">
					<AppRouter/>
				</div>
			</ModalProvider>
			<Toaster position="top-center" />
		</QueryClientProvider>
	);
};

export default App;
