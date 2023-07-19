import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { VarNamesForm } from "./VarNamesForm/VarNamesForm";

interface Props {
    values: Record<string, string | null>;
    message: string;
    togglePreview: (value: boolean) => void;
    onChange: (payload: { name: string; value: string; }) => void;
}

export const MessagePreview = React.memo(({ togglePreview, values, message, onChange }: Props) => {
    return (
        <div>
            <TextareaAutosize
                value={message}
                style={{ resize: "none" }}
                minRows={3}
                cols={100}
                autoComplete="false"
                readOnly={true}
            />
            <VarNamesForm values={values} onChange={onChange} />
            <button onClick={() => togglePreview(false)}>Close</button>
        </div>
    );
});

MessagePreview.displayName = "MessagePreview";
