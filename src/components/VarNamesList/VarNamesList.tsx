import React from "react";
import { VarNames } from "../../types/widget";
import styles from "./styles.module.css";

interface Props {
    arrVarNames: VarNames;
    addVarName: (varName: string) => void;
}

export const VarNamesList = ({ arrVarNames, addVarName }: Props) => {
    return (
        <>
            <h4 className={styles.list__title}>Variables</h4>
            <ul className={styles.list}>
                {arrVarNames.map((varName) => (
                    <li
                        key={varName}
                        className={styles.list__item}
                    >
                        <button
                            className={styles.btn}
                            onClick={() => addVarName(varName)}
                        >{`{${varName}}`}
                        </button>
                    </li>
                ),
                )}
            </ul>
        </>
    );
};
