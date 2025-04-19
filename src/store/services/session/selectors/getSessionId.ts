import { RootState } from '../../../store';

export const getSessionId = (state: RootState) => state.session.sessionId;