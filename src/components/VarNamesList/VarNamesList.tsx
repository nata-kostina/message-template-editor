import React from "react";
import { VarNames } from "../../types/widget";

interface Props {
    arrVarNames: VarNames;
    addVarName: (varName: string) => void;
}

export const VarNamesList = ({ arrVarNames, addVarName }: Props) => {
    return (
        <ul>
            {arrVarNames.map((varName) => (
                <li key={varName}>
                    <button onClick={() => addVarName(varName)}>{`{${varName}}`}</button>
                </li>
            ),
            )}
        </ul>
    );
};
