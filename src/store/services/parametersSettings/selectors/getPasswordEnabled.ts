import { RootState } from '../../../store';

export const getPasswordEnabled = (state: RootState) => state.parameterSettings.isEnablePassword;