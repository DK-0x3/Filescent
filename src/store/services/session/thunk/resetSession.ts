import { StorageKeyType } from '../../../../shared/types/LocalStorageKey';
import { AppThunk } from '../../../store';
import { clearSessionData } from '../slice/sessionSlice';

export const resetSession = (): AppThunk => (dispatch) => {
	dispatch(clearSessionData());
	localStorage.removeItem(StorageKeyType.SESSION);
};