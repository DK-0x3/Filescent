export interface IDownloadPageParams {
	id: string;
}

export interface IDownloadPageQueryParams {
	password: string;
}

export interface IRouteParams {
	download: {
		params: IDownloadPageParams,
		queryParams: IDownloadPageQueryParams
	};
}

export const RouteParams: IRouteParams = {
	download: {
		params: {
			id: 'id',
		},
		queryParams: {
			password: 'password',
		}
	}
};