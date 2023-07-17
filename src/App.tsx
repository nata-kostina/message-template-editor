import React, { useState } from "react";
import { MessageTemplateEditor } from "./components/MessageTemplateEditor/MessageTemplateEditor";
import { useVarNames } from "./hooks/useVarNames";
import { useTemplate } from "./hooks/useTemplate";

export const App = () => {
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);
    const { loading: varNameLoading, data: arrVarNames } = useVarNames();
    const { loading: templateLoading, data: template } = useTemplate();

    const onSave = async () => { };

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
