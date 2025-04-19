import { RootState } from '../../../store';

export const getSessionLanguage = (state: RootState) => state.session.language;
