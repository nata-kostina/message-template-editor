import { produce } from "immer";
import { IActiveTextarea } from "../../../types/widget";
import { WidgetState } from "../../../types/context";

export const setActiveTextareaReducer = (state: WidgetState, textarea: IActiveTextarea): WidgetState => {
    const { nodeId, location } = textarea;
    const nextState = produce(state, draft => {
        if (draft.activeTextarea.nodeId !== nodeId
                || draft.activeTextarea.location !== location) {
            draft.activeTextarea.nodeId = nodeId;
            draft.activeTextarea.location = location;
        }
    });
    return nextState;
};
