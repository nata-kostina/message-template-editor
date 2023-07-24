import React, { useContext, useCallback, useState, useEffect } from "react";
import { addCondition, addVarName, setConditions, initRoot } from "../../../contexts/widget/widget.action.creators";
import { WidgetContext, WidgetDispatchContext } from "../../../contexts/widget/widget.context";
import { CallbackSave, IConditionNode } from "../../../types/widget";
import { MessagePreviewContainer } from "../../MessagePreview/MessagePreviewContainer";
import { MessageTemplateEditor } from "../MessageTemplateEditor/MessageTemplateEditor";
import styles from "./styles.module.css";
import { UserActions } from "../../userActions/UserActions";
import { Panel } from "../../Panel/Panel";
import { getRootNode } from "../../../utils/getNode";
import { generateNode } from "../../../utils/generateNode";

interface Props {
    arrVarNames: string[];
    callbackSave: CallbackSave;
    closeWidget: () => void;
    template: Record<string, IConditionNode> | null;
}

export const MessageTemplateEditorContainer = ({
    arrVarNames, callbackSave, closeWidget, template,
}: Props) => {
    const { conditions } = useContext(WidgetContext);// current conditions
    const dispatch = useContext(WidgetDispatchContext);

    const [rootId, setRootId] = useState("");
    useEffect(() => {
        const id = getRootNode(template)?.id; // get root condition
        if (!id) { // if there is no root
            const rootNode = generateNode(""); // create a root node
            dispatch(initRoot(rootNode)); // init root in context
            setRootId(rootNode.id);
        } else {
            setRootId(id);
        }
        return () => { // reset conditions to initial template
            dispatch(setConditions(template ?? {}));
        };
    }, [dispatch, template]);

    // add new subwidget
    const addNewCondition = useCallback(() => {
        dispatch(addCondition());
    }, [dispatch]);
    // add variable name to the active textarea
    const addVariableName = useCallback((varName: string) => {
        dispatch(addVarName(varName));
    }, [dispatch]);
    // save template to local storage
    const saveTemplate = useCallback(() => {
        callbackSave(conditions)
            .then(() => alert("Template was successfully saved"))
            .catch(() => alert("Error! Template was not saved. Please try again."));
    }, [callbackSave, conditions]);

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    // show/hide preview
    const togglePreview = useCallback((value: boolean) => {
        setIsPreviewOpen(value);
    }, []);
    return (
        <>{rootId && (
            <div
                className={styles.editor}
                data-testid="message-editor"
            >
                <MessageTemplateEditor
                    arrVarNames={arrVarNames}
                    addNewCondition={addNewCondition}
                    addVariableName={addVariableName}
                    template={conditions}
                    rootId={rootId}
                />
                <UserActions
                    closeWidget={closeWidget}
                    saveTemplate={saveTemplate}
                    togglePreview={togglePreview}
                />
                <Panel
                    header="Message Preview"
                    isOpen={isPreviewOpen}
                >
                    <MessagePreviewContainer
                        togglePreview={togglePreview}
                        arrVarNames={arrVarNames}
                        template={conditions}
                    />
                </Panel>
            </div>
        )}
        </>
    );
};
