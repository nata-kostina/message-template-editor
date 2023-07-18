import React, { useContext, useEffect, useCallback } from "react";
import { initRoot, addCondition, addVarName } from "../../contexts/widget/widget.action.creators";
import { WidgetContext, WidgetDispatchContext } from "../../contexts/widget/widget.context";
import { VarNames, IConditionNode, CallbackSave } from "../../types/widget";
import { getRootNode } from "../../utils/getRootNode";
import { MessageTemplateEditor } from "./MessageTemplateEditor";

interface Props {
    arrVarNames: VarNames;
    template: Record<string, IConditionNode> | null;
    callbackSave: CallbackSave;
}

export const MessageTemplateEditorContainer = ({ arrVarNames, callbackSave, template }: Props) => {
    const { rootConditionId, conditions } = useContext(WidgetContext);
    const dispatch = useContext(WidgetDispatchContext);
    useEffect(() => {
        const rootNode = getRootNode(template);
        dispatch(initRoot(rootNode));
    }, [dispatch, template]);

    const addNewCondition = useCallback(() => {
        dispatch(addCondition());
    }, [dispatch]);

    const addVariableName = useCallback((varName: string) => {
        dispatch(addVarName(varName));
    }, [dispatch]);
    const saveTemplate = useCallback(() => {
        callbackSave(conditions)
            .then(() => alert("Template was successfully saved"))
            .catch(() => alert("Error! Template was not saved. Please try again."));
    }, [callbackSave, conditions]);
    return (
        <>{rootConditionId && (
            <MessageTemplateEditor
                rootConditionId={rootConditionId}
                arrVarNames={arrVarNames}
                addNewCondition={addNewCondition}
                addVariableName={addVariableName}
                saveTemplate={saveTemplate}
            />
        )}
        </>
    );
};
