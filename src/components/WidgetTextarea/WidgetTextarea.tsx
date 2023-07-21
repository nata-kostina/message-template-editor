import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./styles.module.css";

interface Props {
    content: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSelect: () => void;
}

const WidgetTextarea = React.forwardRef<HTMLTextAreaElement, Props>(({ content, onChange, onSelect }, ref) => {
    return (
        <TextareaAutosize
            className={styles.textarea}
            onChange={onChange}
            onSelect={onSelect}
            value={content}
            style={{ resize: "none" }}
            minRows={2}
            cols={100}
            autoComplete="false"
            ref={ref}
        />
    );
});
WidgetTextarea.displayName = "WidgetTextarea";
export const MemoWidgetTextarea = React.memo(WidgetTextarea);
