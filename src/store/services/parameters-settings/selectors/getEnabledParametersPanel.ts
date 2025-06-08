import { RootState } from '../../../store';

export const getEnabledParametersPanel = (state: RootState) => state.parameterSettings.isEnable;