import { RootState } from '../../../store';

export const getEnabledCustomCountLoad = (state: RootState) => state.parameterSettings.isEnableCustomCountLoad;