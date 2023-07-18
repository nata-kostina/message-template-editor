import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { IConditionNode } from "../../../types/widget";

interface Props {
    node: IConditionNode;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSelect: () => void;
}

const WidgetTextarea = React.forwardRef<HTMLTextAreaElement, Props>(({ node, onChange, onSelect }, ref) => {
    return (
        <TextareaAutosize
            onChange={onChange}
            onSelect={onSelect}
            value={node.startContent}
            style={{ resize: "none" }}
            minRows={7}
            cols={100}
            autoComplete="false"
            ref={ref}
        />
    );
});
WidgetTextarea.displayName = "WidgetTextarea";
export const MemoWidgetTextarea = React.memo(WidgetTextarea);
