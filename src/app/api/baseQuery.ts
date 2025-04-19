import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../env';

const setBaseUrl = () => {
	const serverEnvironment = API_URL;

	switch (serverEnvironment) {
	case 'VITE_API_URL=http://localhost:25504':
		return serverEnvironment;
	default:
		// throw new Error(`Неизвестная среда: ${serverEnvironment}`);
		return 'VITE_API_URL=http://localhost:25504';
	}
};

export const baseQuery = fetchBaseQuery({
	baseUrl: setBaseUrl(),
	credentials: 'include',
	// prepareHeaders: (headers) => {
	// 	const authorization = localStorage.getItem('token')
	// 		? localStorage.getItem('token')
	// 		: sessionStorage.getItem('token');
	//
	// 	const token = `Bearer ${authorization}`;
	//
	// 	headers.set('Client-Request-Id', uuid());
	// 	headers.set('Authorization', token || '');
	//
	// 	return headers;
	// },
});