import { useEffect } from 'react';
import { useAppDispatch } from '../../store/types/useAppDispatch';
import { initSession } from '../../store/services/session/thunk/initSession';
import { updateLastActivity } from '../../store/services/session/thunk/updateLastActivity';

export const useSessionActivity = () => {
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
};
