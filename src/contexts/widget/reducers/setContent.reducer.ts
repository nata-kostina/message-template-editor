import { produce } from "immer";
import { WidgetState } from "../../../types/context";

export const setContentReducer = (state: WidgetState, payload: { nodeId: string; content: string; }): WidgetState => {
    const { nodeId, content } = payload;
    const nextState = produce(state, draft => {
        const node = draft.conditions[nodeId];
        if (node) {
            draft.conditions[nodeId].startContent = content;
        }
    });
    return nextState;
};
