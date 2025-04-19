import { Language } from '../../../../shared/types/language';

export interface ISessionState {
    sessionId: string | null;
    language: Language;
    lastActivity: number | null;
}