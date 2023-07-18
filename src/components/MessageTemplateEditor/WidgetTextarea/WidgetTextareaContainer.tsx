import React, { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { setActiveTextarea, setContent } from "../../../contexts/widget/widget.action.creators";
import { WidgetContext, WidgetDispatchContext } from "../../../contexts/widget/widget.context";
import { IActiveTextarea, IConditionNode } from "../../../types/widget";
import { debounce } from "../../../utils/debounce";
import { MemoWidgetTextarea } from "./WidgetTextarea";

interface Props {
    node: IConditionNode;
}

export const WidgetTextareaContainer = ({ node }: Props) => {
    const { activeTextarea } = useContext(WidgetContext);
    const dispatch = useContext(WidgetDispatchContext);
    const ref = useRef<HTMLTextAreaElement>(null);

    const debouncedDispatchChangeActiveTextarea = useMemo(
        () => debounce((payload: IActiveTextarea) => {
            dispatch(setActiveTextarea(payload));
        }), [dispatch]);

    const onSelect = useCallback(() => {
        if (ref.current) {
            debouncedDispatchChangeActiveTextarea({ nodeId: node.id, location: ref.current.selectionStart });
        }
    }, [debouncedDispatchChangeActiveTextarea, node.id]);
    const onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        dispatch(setContent({ nodeId: node.id, content: event.target.value }));
    }, [dispatch, node.id]);

    useEffect(() => {
        if (node.id === activeTextarea.nodeId
            && ref.current && document.activeElement !== ref.current &&
            document.hasFocus()) {
            ref.current.focus();
            ref.current.setSelectionRange(activeTextarea.location, activeTextarea.location);
        }
    }, [activeTextarea, node.id]);

    return (
        <MemoWidgetTextarea node={node} onChange={onChange} onSelect={onSelect} ref={ref} />
    );
};
