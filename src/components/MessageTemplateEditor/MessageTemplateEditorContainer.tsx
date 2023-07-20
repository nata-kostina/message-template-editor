import React, { useContext, useCallback, useState } from "react";
import { addCondition, addVarName } from "../../contexts/widget/widget.action.creators";
import { WidgetContext, WidgetDispatchContext } from "../../contexts/widget/widget.context";
import { VarNames, CallbackSave } from "../../types/widget";
import { getRootNode } from "../../utils/getNode";
import { MessagePreviewContainer } from "../MessagePreview/MessagePreviewContainer";
import { MessageTemplateEditor } from "./MessageTemplateEditor";

interface Props {
    arrVarNames: VarNames;
    callbackSave: CallbackSave;
    closeWidget: () => void;
}

export const MessageTemplateEditorContainer = ({ arrVarNames, callbackSave, closeWidget }: Props) => {
    const { conditions } = useContext(WidgetContext);
    const rootConditionId = getRootNode(conditions)?.id;
    const dispatch = useContext(WidgetDispatchContext);

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

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const togglePreview = useCallback((value: boolean) => {
        setIsPreviewOpen(value);
    }, []);

    return (
        <>{rootConditionId && (
            <div data-testid="message-editor">
                <MessageTemplateEditor
                    rootConditionId={rootConditionId}
                    arrVarNames={arrVarNames}
                    addNewCondition={addNewCondition}
                    addVariableName={addVariableName}
                    template={conditions}
                />
                <div>
                    <button onClick={() => togglePreview(true)}>Preview</button>
                    <button onClick={saveTemplate}>Save</button>
                    <button onClick={closeWidget}>Close</button>
                </div>
                {isPreviewOpen && (
                    <MessagePreviewContainer
                        togglePreview={togglePreview}
                        arrVarNames={arrVarNames}
                        template={conditions}
                    />
                )}
            </div>
        )}
        </>
    );
};
