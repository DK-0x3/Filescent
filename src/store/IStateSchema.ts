import { IParametersSettingsSchema } from './services/parameters-settings/IParameterSettingsSchema';
import { api } from '../app/api/API.ts';


export interface IStateSchema {
    parameterSettings: IParametersSettingsSchema;
    [api.reducerPath]: ReturnType<typeof api.reducer>;
}