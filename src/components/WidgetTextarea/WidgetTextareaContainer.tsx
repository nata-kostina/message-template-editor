import React, { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { setActiveTextarea, setContent } from "../../contexts/widget/widget.action.creators";
import { WidgetContext, WidgetDispatchContext } from "../../contexts/widget/widget.context";
import { IActiveTextarea } from "../../types/widget";
import { debounce } from "../../utils/debounce";

import { MemoWidgetTextarea } from "./WidgetTextarea";

interface Props {
    nodeId: string;
    content: string;
}

export const WidgetTextareaContainer = ({ nodeId, content }: Props) => {
    const { activeTextarea } = useContext(WidgetContext);
    const dispatch = useContext(WidgetDispatchContext);
    const ref = useRef<HTMLTextAreaElement>(null);
    // debounced function to change active textarea
    const debouncedDispatchChangeActiveTextarea = useMemo(
        () => debounce((payload: IActiveTextarea) => {
            dispatch(setActiveTextarea(payload));
        }), [dispatch]);

    // change active textarea when textarea us selected
    const onSelect = useCallback(() => {
        if (ref.current) {
            debouncedDispatchChangeActiveTextarea({ nodeId, location: ref.current.selectionStart });
        }
    }, [debouncedDispatchChangeActiveTextarea, nodeId]);

    const onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        // set content for the textarea
        dispatch(setContent({ nodeId, content: event.target.value }));
    }, [dispatch, nodeId]);

    useEffect(() => {
        // if current textarea is active and not on focus
        if (nodeId === activeTextarea.nodeId
            && ref.current && document.activeElement !== ref.current &&
            document.hasFocus()) {
            ref.current.focus(); // focus on current textarea
            // set cursor to the right place
            ref.current.setSelectionRange(activeTextarea.location, activeTextarea.location);
        }
    }, [activeTextarea, nodeId]);

    return (
        <MemoWidgetTextarea content={content} onChange={onChange} onSelect={onSelect} ref={ref} />
    );
};
