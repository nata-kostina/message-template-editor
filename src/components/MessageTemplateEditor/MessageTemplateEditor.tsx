import React from "react";
import { IConditionNode, VarNames } from "../../types/widget";
import { ConditionNode } from "../ConditionNode/ConditionNode";
import { VarNamesList } from "../VarNamesList/VarNamesList";

interface Props {
    arrVarNames: VarNames;
    addNewCondition: () => void;
    addVariableName: (varName: string) => void;
    rootConditionId: string;
    template: Record<string, IConditionNode>;
}

export const MessageTemplateEditor = React.memo(({
    arrVarNames,
    addNewCondition,
    addVariableName,
    rootConditionId,
    template,
}: Props) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
            <VarNamesList arrVarNames={arrVarNames} addVarName={addVariableName} />
            <button onClick={addNewCondition}>IF-THEN-ELSE</button>
            <ConditionNode nodeId={rootConditionId} template={template} />
        </div>
    );
});
MessageTemplateEditor.displayName = "MessageTemplateEditor";
