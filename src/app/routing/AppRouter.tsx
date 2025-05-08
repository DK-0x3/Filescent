import { Navigate, Route, Routes } from 'react-router-dom';
import ROUTES from './routes';
import Layout from '../../page/layout/Loyout';
import MainPage from '../../page/main/MainPage';
import { DownloadPage } from '../../page/download/DownloadPage';

const AppRouter = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<Layout/>}>
				<Route index element={<MainPage/>}/>
				<Route path={ROUTES.DOWNLOAD} element={<DownloadPage/>}/>
				<Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.HOME} replace />} />
			</Route>
		</Routes>
	);
};

export default AppRouter;