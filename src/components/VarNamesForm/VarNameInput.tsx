import React, { useState } from "react";
import styles from "./styles.module.css";

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
        <div className={styles["input-group"]}>
            <label htmlFor={varName} className={styles.label}>
                {`{${varName}}`}
            </label>
            <input
                name={varName}
                onChange={onInputChange}
                value={value}
                autoComplete="false"
                id={varName}
                className={styles.input}
            />
        </div>
    );
};
