import './styles/App.css';
import './styles/globaVariables.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from '../widgets/modal/model/ModalContext';
import AppRouter from './rout/AppRouter';
import { useSessionActivity } from '../shared/hooks/useSessionActivity';

const App = () => {
	const queryClient = new QueryClient();
	useSessionActivity();
	
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
