import React, { useState, useEffect, useContext, useCallback } from "react";
import styles from "./styles.module.css";
import { useVarNames } from "./hooks/useVarNames";
import { useTemplate } from "./hooks/useTemplate";
import { IConditionNode } from "./types/widget";
import { validateTemplate } from "./validation/validate";
import { WidgetDispatchContext } from "./contexts/widget/widget.context";
import { MessageTemplateEditorContainer }
    from "./components/MessageTemplateEditor/MessageTemplateEditorContainer/MessageTemplateEditorContainer";
import { setConditions, setTemplate } from "./contexts/widget/widget.action.creators";
import { Loader } from "./components/Loader/Loader";
import { Panel } from "./components/Panel/Panel";

export const App = () => {
    const dispatch = useContext(WidgetDispatchContext);
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);
    const { loading: varNameLoading, data: arrVarNames } = useVarNames();
    const { loading: templateLoading, data: template, setTemplate: updateTemplate } = useTemplate();

    const onSave = async (templateObj: Record<string, IConditionNode>) => {
        return validateTemplate(templateObj).then((data) => {
            updateTemplate(data); // set template to local storage
            dispatch(setTemplate(data ?? {})); // set template to context
        });
    };

    useEffect(() => {
        if (!templateLoading && template) { // if there is template in local storage
            dispatch(setTemplate(template)); // set template to context
            dispatch(setConditions(template)); // set condition nodes equaled to template
        }
    }, [templateLoading, template, dispatch]);

    const closeWidget = useCallback(() => {
        setIsWidgetOpen(false);
    }, []);

    const isLoading = varNameLoading || templateLoading;
    return (
        <main className={styles.main}>
            {isLoading ? <Loader /> : (
                <button
                    className={styles.btn}
                    onClick={() => setIsWidgetOpen(true)}
                >Message Editor
                </button>
            )}
            <Panel
                isOpen={isWidgetOpen}
                header="Message Template Editor"
                subheader="Edit Message"
            >
                {arrVarNames && (
                    <MessageTemplateEditorContainer
                        arrVarNames={arrVarNames}
                        callbackSave={onSave}
                        closeWidget={closeWidget}
                        template={template}
                    />
                )}
            </Panel>
        </main>
    );
};
