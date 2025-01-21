import { useState } from 'react';
import './DropDownMenuHover.scss';
import { useTranslation } from 'react-i18next';
import {IDropDownItem} from "./interface/IDropDownItem.ts";

export interface IDropDownMenuHoverProps {
    fnChanged: (selectedItem: IDropDownItem) => void;
    defaultItem: IDropDownItem;
    items: IDropDownItem[];
    className?: string;
}

export const DropDownMenuHover = (props: IDropDownMenuHoverProps) => {
    const { t } = useTranslation();
    const { className, fnChanged, defaultItem, items } = props;

    const [selectedOption, setSelectedOption] = useState<IDropDownItem>(defaultItem);

    const handleOptionClick = (item: IDropDownItem) => {
        setSelectedOption(item);
        fnChanged(item);
    };

    return (
        <div className={`dropDownMenuHover ${className}`}>
            <div className={'select'}>
                <span>{t(selectedOption.text)}</span>
                <ul>
                    {
                        items.map((item: IDropDownItem) => (
                            <li
                                key={item.key}
                                className={`${
                                    item.key === selectedOption.key ? 'selected' : ''
                                }`}
                                onClick={() => handleOptionClick(item)}
                            >
                                {t(item.text)}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};
