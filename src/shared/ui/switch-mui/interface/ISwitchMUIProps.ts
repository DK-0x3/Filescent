import { PayloadAction } from '@reduxjs/toolkit';
import { SxProps } from '@mui/material';
import { RootState } from '../../../../store/store';

export interface ISwitchMUIProps {
    /**
     * Метод для изменения состояния в `Redux`.
     * @param payload
     */
    onDispatchToggle: (payload: boolean) => PayloadAction<boolean>;
    /**
     * Селектор для получения состояния из `Store`.
     * @param state
     */
    changeSelector: (state: RootState) => boolean;
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