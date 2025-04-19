import { createRoot } from 'react-dom/client';
import './app/styles/index.css';
import App from './app/App';
import './i18next/i18next';
import { Provider } from 'react-redux';
import store from './store/store';

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
