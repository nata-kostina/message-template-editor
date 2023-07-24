import React from "react";
import { IConditionNode } from "../../../types/widget";
import { ConditionNode } from "../../ConditionNode/ConditionNode";
import { VarNamesList } from "../../VarNamesList/VarNamesList";
import styles from "./styles.module.css";

interface Props {
    arrVarNames: string[];
    addNewCondition: () => void;
    addVariableName: (varName: string) => void;
    template: Record<string, IConditionNode>;
    rootId: string;
}

export const MessageTemplateEditor = React.memo(({
    arrVarNames,
    addNewCondition,
    addVariableName,
    template,
    rootId,
}: Props) => {
    return (
        <div className={styles.editor}>
            <VarNamesList arrVarNames={arrVarNames} addVarName={addVariableName} />
            <div className={styles.editor__inner}>
                <div className={styles.header}>
                    <span className={styles.title}>Message Template</span>
                    <button
                        className={styles.btn}
                        onClick={addNewCondition}
                    >IF-THEN-ELSE
                    </button>
                </div>
                <ConditionNode nodeId={rootId} template={template} />
            </div>
        </div>

    );
});
MessageTemplateEditor.displayName = "MessageTemplateEditor";
