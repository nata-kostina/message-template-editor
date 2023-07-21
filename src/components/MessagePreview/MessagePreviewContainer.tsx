import React, { useState, useEffect, useCallback, useMemo } from "react";
import { VarNames, IConditionNode } from "../../types/widget";
import { debounce } from "../../utils/debounce";
import { generateMessage } from "../../utils/generateMessage";
import { MessagePreview } from "./MessagePreview";

interface Props {
    arrVarNames: VarNames;
    template: Record<string, IConditionNode> | null;
    togglePreview: (value: boolean) => void;
}

export const MessagePreviewContainer = React.memo(({
    togglePreview,
    arrVarNames,
    template,
}: Props) => {
    const [message, setMessage] = useState("");
    const [values, setValues] = useState<Record<string, string | null> | null>(null);

    const changeTemplate = useCallback((formValues: Record<string, string | null>) => {
        if (template) {
            const text = generateMessage(formValues, template);
            setMessage(text);
        }
    }, [template]);

    useEffect(() => {
        const formValues = arrVarNames.reduce((acc, varName) => {
            acc[varName] = null;
            return acc;
        }, {} as Record<string, string | null>);
        setValues(formValues);
        changeTemplate(formValues);
    }, [arrVarNames, changeTemplate]);

    useEffect(() => {
        if (values) {
            changeTemplate(values);
        }
    }, [changeTemplate, values]);

    const changeValue = useCallback(({ name, value }: { name: string; value: string; }) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    }, []);

    const debounceChangeValue = useMemo(() =>
        debounce((payload: { name: string; value: string; }) =>
            changeValue(payload)), [changeValue]);
    return (
        <>
            {values && (
                <MessagePreview
                    values={values}
                    message={message}
                    onChange={debounceChangeValue}
                    togglePreview={togglePreview}
                />
            )}
        </>
    );
});

MessagePreviewContainer.displayName = "MessagePreview";
