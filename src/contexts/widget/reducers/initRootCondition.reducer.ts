import { produce } from "immer";
import { WidgetState } from "../../../types/context";
import { generateNode } from "../../../utils/generateNode";

export const initRootConditionReducer = (state: WidgetState): WidgetState => {
    const nextState = produce(state, draft => {
        const node = generateNode("");
        draft.conditions[node.id] = node;
        draft.activeTextarea.nodeId = node.id;
        draft.activeTextarea.location = node.startContent.length;
    });
    return nextState;
};
