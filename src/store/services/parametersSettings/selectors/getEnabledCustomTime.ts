import { RootState } from '../../../store';

export const getEnabledCustomTime = (state: RootState) => state.parameterSettings.isEnableCustomTime;