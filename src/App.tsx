import React, { useState, useEffect } from "react";
import { MessageTemplateEditor } from "./components/MessageTemplateEditor/MessageTemplateEditor";
import { useVarNames } from "./hooks/useVarNames";
import { useTemplate } from "./hooks/useTemplate";
import { IConditionNode } from "./types/widget";
import { useAppDispatch } from "./hooks/reduxHooks";
import { setConditions } from "./store/widget/widgetSlice";
import { validateTemplate } from "./validation/validate";

export const App = () => {
    const dispatch = useAppDispatch();
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

    return (
        <div>
            {(varNameLoading || templateLoading) ? <p>Loading...</p> : (
                <>
                    <button onClick={() => setIsWidgetOpen(true)}>Message Editor</button>
                    {isWidgetOpen && arrVarNames && (
                        <MessageTemplateEditor
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
