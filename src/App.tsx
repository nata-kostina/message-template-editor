import React, { useState, useEffect, useContext } from "react";
import { useVarNames } from "./hooks/useVarNames";
import { useTemplate } from "./hooks/useTemplate";
import { IConditionNode } from "./types/widget";
import { validateTemplate } from "./validation/validate";
import { WidgetDispatchContext } from "./contexts/widget/widget.context";
import { MessageTemplateEditorContainer } from "./components/MessageTemplateEditor/MessageTemplateEditorContainer";
import { setConditions } from "./contexts/widget/widget.action.creators";

export const App = () => {
    const dispatch = useContext(WidgetDispatchContext);
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);
    const { loading: varNameLoading, data: arrVarNames } = useVarNames();
    const { loading: templateLoading, data: template, setTemplate } = useTemplate();
    const onSave = async (templateObj: Record<string, IConditionNode>) => {
        return validateTemplate(templateObj).then((data) => setTemplate(data));
    };

    useEffect(() => {
        if (!templateLoading && template) {
            dispatch(setConditions(template));
        }
    }, [templateLoading, template, dispatch]);
    console.log("App render");
    return (
        <div>
            {(varNameLoading || templateLoading) ? <p>Loading...</p> : (
                <>
                    <button onClick={() => setIsWidgetOpen(true)}>Message Editor</button>
                    {isWidgetOpen && arrVarNames && (
                        <MessageTemplateEditorContainer
                            arrVarNames={arrVarNames}
                            template={template}
                            callbackSave={onSave}
                        />
                    )}
                </>
            )}
        </div>
    );
};
