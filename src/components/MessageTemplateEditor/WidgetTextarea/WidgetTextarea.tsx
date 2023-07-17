import React, { useEffect, useMemo, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { IActiveTextarea, IConditionNode } from "../../../types/widget";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { changeActiveTextarea, setContent } from "../../../store/widget/widgetSlice";
import { debounce } from "../../../utils/debounce";

interface Props {
    node: IConditionNode;
    type: "template" | "condition";
    content: string;
}

export const WidgetTextarea = ({ node, type, content }: Props) => {
    const activeTextarea = useAppSelector((state) => state.widget.activeTextarea);
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLTextAreaElement>(null);

    const debouncedDispatchChangeActiveTextarea = useMemo(
        () => debounce((payload: IActiveTextarea) => {
            dispatch(changeActiveTextarea(payload));
        }), [dispatch]);

    const onSelect = () => {
        if (ref.current) {
            debouncedDispatchChangeActiveTextarea({ nodeId: node.id, location: ref.current.selectionStart });
        }
    };
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        dispatch(setContent({ nodeId: node.id, content: event.target.value }));
    };
    useEffect(() => {
        if (node.id === activeTextarea.nodeId
            && ref.current && document.activeElement !== ref.current &&
            document.hasFocus()) {
            ref.current.focus();
            ref.current.setSelectionRange(activeTextarea.location, activeTextarea.location);
        }
    }, [activeTextarea, node.id, type]);

    return (
        <TextareaAutosize
            onChange={onChange}
            onSelect={onSelect}
            value={content}
            style={{ resize: "none" }}
            minRows={7}
            cols={100}
            autoComplete="false"
            ref={ref}
        />
    );
};
