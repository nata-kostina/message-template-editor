import React from "react";
import { VarNameInput } from "./VarNameInput";
import styles from "./styles.module.css";

interface Props {
    values: Record<string, string | null>;
    onChange: (payload: { name: string; value: string; }) => void;
}

export const VarNamesForm = ({ values, onChange }: Props) => {
    const varNames = Object.keys(values);
    return (
        <>
            <h3 className={styles.form__title}>LinkedIn Variables</h3>
            <form name="form" className={styles.form}>
                {varNames.map((varName) => {
                    return (
                        <VarNameInput key={varName} onChange={onChange} varName={varName} />
                    );
                })}
            </form>
        </>
    );
};
