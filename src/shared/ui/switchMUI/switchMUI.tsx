import React, { useState } from "react";
import { Switch } from "@mui/material";

interface ISwitchMUIProps {
    className?: string;
    initialChecked?: boolean;
    onToggle?: (checked: boolean) => void;
}

export const SwitchMUI: React.FC<ISwitchMUIProps> = (props) => {
    const { className, initialChecked = false, onToggle } = props;

    const [checked, setChecked] = useState(initialChecked);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        if (onToggle) {
            onToggle(isChecked);
        }
    };

    return (
        <Switch
            className={className}
            checked={checked}
            onChange={handleChange}
            defaultChecked

            sx={{
                "& .MuiSwitch-thumb": {
                    color: checked ? "var(--green-light)" : "var(--gray-dark)",
                },
                "& .MuiSwitch-track": {
                    backgroundColor: checked ? "red" : "red",
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'var(--green-dark)',
                },
            }}
        />
    );
};
