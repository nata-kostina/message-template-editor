import React, { useState, useEffect, useCallback, useMemo } from "react";
import { IConditionNode } from "../../types/widget";
import { debounce } from "../../utils/debounce";
import { generateMessage } from "../../utils/generateMessage";
import { MessagePreview } from "./MessagePreview";

interface Props {
    arrVarNames: string[];
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

    // change message on preview
    const changePreview = useCallback((formValues: Record<string, string | null>) => {
        if (template) {
            const text = generateMessage(formValues, template); // generate message from template
            setMessage(text);
        }
    }, [template]);

    useEffect(() => {
        // initialize form values
        const formValues = arrVarNames.reduce((acc, varName) => {
            acc[varName] = null;
            return acc;
        }, {} as Record<string, string | null>);
        setValues(formValues);
        changePreview(formValues);
    }, [arrVarNames, changePreview]);

    useEffect(() => {
        if (values) { // call changePreview when user input new form values
            changePreview(values);
        }
    }, [changePreview, values]);

    // change form values
    const changeValue = useCallback(({ name, value }: { name: string; value: string; }) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    }, []);

    // debounced function to change form values
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
