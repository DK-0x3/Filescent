import { useEffect, useRef, useState } from 'react';
import './DropDownList.scss';
import { useTranslation } from 'react-i18next';

export interface IDropDownItem {
    key: string;
    text: string;
}

interface IDropDownListProps {
    fnChanged: (selectedItem: IDropDownItem) => void;
    defaultItem: IDropDownItem;
    items: IDropDownItem[];
    className?: string;
}

export const DropDownList = (props: IDropDownListProps) => {
    const { t } = useTranslation();
    const { className, fnChanged, defaultItem, items } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<IDropDownItem>(defaultItem);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState);
    };

    const handleOptionClick = (item: IDropDownItem) => {
        setSelectedOption(item);
        setIsOpen(false);
        fnChanged(item);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={`select-dropdown ${className}`}>
            <button className="select-toggle" onClick={toggleDropdown}>
                {t(selectedOption.text)}
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>
            <ul className={`select-menu ${isOpen ? 'open' : ''}`}>
                {items.map((item) => (
                    <li
                        key={item.key}
                        className={`select-option ${
                            item.key === selectedOption.key ? 'selected' : ''
                        }`}
                        onClick={() => handleOptionClick(item)}
                    >
                        {t(item.text)}
                    </li>
                ))}
            </ul>
        </div>
    );
};
