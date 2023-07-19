import React, { useState, useEffect, useContext, useCallback } from "react";
import { useVarNames } from "./hooks/useVarNames";
import { useTemplate } from "./hooks/useTemplate";
import { IConditionNode } from "./types/widget";
import { validateTemplate } from "./validation/validate";
import { WidgetDispatchContext } from "./contexts/widget/widget.context";
import { MessageTemplateEditorContainer } from "./components/MessageTemplateEditor/MessageTemplateEditorContainer";
import { initRoot, setConditions } from "./contexts/widget/widget.action.creators";

export const App = () => {
    const dispatch = useContext(WidgetDispatchContext);
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);
    const { loading: varNameLoading, data: arrVarNames } = useVarNames();
    const { loading: templateLoading, data: template, setTemplate } = useTemplate();

    const onSave = async (templateObj: Record<string, IConditionNode>) => {
        return validateTemplate(templateObj).then((data) => setTemplate(data));
    };

    useEffect(() => {
        if (!templateLoading) {
            if (template) {
                dispatch(setConditions(template));
            } else {
                dispatch(initRoot());
            }
        }
    }, [templateLoading, template, dispatch]);

    const closeWidget = useCallback(() => {
        setIsWidgetOpen(false);
    }, []);

    return (
        <div>
            {(varNameLoading || templateLoading) ? <p>Loading...</p> : (
                <>
                    <button onClick={() => setIsWidgetOpen(true)}>Message Editor</button>
                    {isWidgetOpen && arrVarNames && (
                        <MessageTemplateEditorContainer
                            arrVarNames={arrVarNames}
                            callbackSave={onSave}
                            closeWidget={closeWidget}
                        />
                    )}
                </>
            )}
        </div>
    );
};
