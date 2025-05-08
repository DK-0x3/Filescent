import { RouteParams } from './routeParams';

const ROUTES = {
	HOME: '/',
	NOT_FOUND: '*',
	DOWNLOAD: `/:${RouteParams.download.params.id}`
};

export default ROUTES;