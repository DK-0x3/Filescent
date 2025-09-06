export enum ParametersPanelState {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    HIDDEN = 'HIDDEN',
}

export interface IParametersSettingsSchema {
    isEnablePassword: boolean;
    isEnableCustomTime: boolean;
    isEnableCustomCountLoad: boolean;
    isEnable: ParametersPanelState;
}