import React, { useState } from "react";

interface Props {
    varName: string;
    onChange: (payload: { name: string; value: string; }) => void;
}

export const VarNameInput = ({ varName, onChange }: Props) => {
    const [value, setValue] = useState("");
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        onChange({ name: event.target.name, value: event.target.value });
    };
    return (
        <input
            placeholder={varName}
            name={varName}
            onChange={onInputChange}
            value={value}
            autoComplete="false"
        />
    );
};
