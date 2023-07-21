import React, { useState, useEffect, useContext, useCallback } from "react";
import styles from "./styles.module.css";
import { useVarNames } from "./hooks/useVarNames";
import { useTemplate } from "./hooks/useTemplate";
import { IConditionNode } from "./types/widget";
import { validateTemplate } from "./validation/validate";
import { WidgetDispatchContext } from "./contexts/widget/widget.context";
import { MessageTemplateEditorContainer }
    from "./components/MessageTemplateEditor/MessageTemplateEditorContainer/MessageTemplateEditorContainer";
import { initRoot, setConditions, setTemplate } from "./contexts/widget/widget.action.creators";
import { generateNode } from "./utils/generateNode";
import { Loader } from "./components/Loader/Loader";
import { Panel } from "./components/Panel/Panel";

export const App = () => {
    const dispatch = useContext(WidgetDispatchContext);
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);
    const { loading: varNameLoading, data: arrVarNames } = useVarNames();
    const { loading: templateLoading, data: template, setTemplate: updateTemplate } = useTemplate();

    const onSave = async (templateObj: Record<string, IConditionNode>) => {
        return validateTemplate(templateObj).then((data) => {
            updateTemplate(data);
            dispatch(setTemplate(data ?? {}));
        });
    };

    useEffect(() => {
        if (!templateLoading) {
            if (template) {
                dispatch(setTemplate(template));
                dispatch(setConditions(template));
            } else {
                const rootNode = generateNode("");
                dispatch(initRoot(rootNode));
            }
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
                    />
                )}
            </Panel>
        </main>
    );
};
