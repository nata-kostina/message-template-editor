import React, { useEffect } from "react";
import { CallbackSave, IConditionNode, VarNames } from "../../types/widget";
import { ConditionNode } from "./ConditionNode/ConditionNode";
import { VarNamesList } from "../VarNamesList/VarNamesList";
import {
    addCondition,
    addVarName,
    initRootCondition,
} from "../../store/widget/widgetSlice";
import { getRootNode } from "../../utils/getRootNode";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

interface Props {
    arrVarNames: VarNames;
    template: Record<string, IConditionNode> | null;
    callbackSave: CallbackSave;
}

export const MessageTemplateEditor = ({
    arrVarNames,
    template,
    callbackSave,
}: Props) => {
    const dispatch = useAppDispatch();
    const rootConditionId = useAppSelector((state) => state.widget.rootConditionId);
    const conditions = useAppSelector((state) => state.widget.conditions);

    useEffect(() => {
        const rootNode = getRootNode(template);
        dispatch(initRootCondition(rootNode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAddConditionClick = () => {
        dispatch(addCondition());
    };
    const addVarNameFn = (varName: string) => {
        dispatch(addVarName(varName));
    };
    const saveTemplate = () => {
        callbackSave(conditions)
            .then(() => alert("Template was successfully saved"))
            .catch(() => alert("Error! Template was not saved. Please try again."));
    };
    return (
        <>
            {rootConditionId && (
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <VarNamesList arrVarNames={arrVarNames} addVarName={addVarNameFn} />
                        <button onClick={onAddConditionClick}>IF-THEN-ELSE</button>
                        <ConditionNode nodeId={rootConditionId} />
                        <button onClick={saveTemplate}>Save</button>
                    </div>
                </>
            )}
        </>
    );
};
