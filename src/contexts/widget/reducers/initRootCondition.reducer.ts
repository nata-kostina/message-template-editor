import { produce } from "immer";
import { WidgetState } from "../../../types/context";
import { IConditionNode } from "../../../types/widget";

export const initRootConditionReducer = (state: WidgetState, node: IConditionNode): WidgetState => {
    const nextState = produce(state, draft => {
        draft.rootConditionId = node.id;
        draft.conditions[node.id] = node;
        draft.activeTextarea.nodeId = node.id;
        draft.activeTextarea.location = node.startContent.length;
    });
    return nextState;
};
