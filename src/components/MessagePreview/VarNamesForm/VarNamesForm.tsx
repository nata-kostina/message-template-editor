import React from "react";
import { VarNameInput } from "./VarNameInput";

interface Props {
    values: Record<string, string | null>;
    onChange: (payload: { name: string; value: string; }) => void;
}

export const VarNamesForm = ({ values, onChange }: Props) => {
    const varNames = Object.keys(values);
    return (
        <form>
            {varNames.map((varName) => {
                return (
                    <VarNameInput key={varName} onChange={onChange} varName={varName} />
                );
            })}
        </form>
    );
};
