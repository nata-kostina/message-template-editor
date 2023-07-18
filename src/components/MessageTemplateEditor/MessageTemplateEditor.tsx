import React from "react";
import { VarNames } from "../../types/widget";
import { ConditionNode } from "./ConditionNode/ConditionNode";
import { VarNamesList } from "../VarNamesList/VarNamesList";

interface Props {
    arrVarNames: VarNames;
    addNewCondition: () => void;
    addVariableName: (varName: string) => void;
    saveTemplate: () => void;
    rootConditionId: string;
}

export const MessageTemplateEditor = React.memo(({
    arrVarNames,
    addNewCondition,
    addVariableName,
    saveTemplate,
    rootConditionId,
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
            <ConditionNode nodeId={rootConditionId} />
            <button onClick={saveTemplate}>Save</button>
        </div>
    );
});
MessageTemplateEditor.displayName = "MessageTemplateEditor";
