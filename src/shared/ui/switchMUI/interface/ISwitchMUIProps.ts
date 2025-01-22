import { PayloadAction } from '@reduxjs/toolkit';
import { IStateSchema } from '../../../../store/IStateSchema';
import { SxProps } from '@mui/material';

export interface ISwitchMUIProps {
    /**
     * Метод для изменения состояния в `Redux`.
     * @param payload
     */
    onDispatchToggle: (payload: boolean) => PayloadAction<boolean>;
    /**
     * Сетелкор для получения состояния из `Store`.
     * @param state
     */
    changeSelector: (state: IStateSchema) => boolean;
    /**
     * Функция срабатывающая до срабатывания `Switch`.
     * @param checked
     */
    onPrevToggle?: (checked: boolean) => Promise<boolean>;
    /**
     * Дополнительные стили.
     */
    sx?: SxProps;
}