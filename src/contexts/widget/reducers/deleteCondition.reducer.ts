import { produce } from "immer";
import { WidgetState } from "../../../types/context";

export const deleteConditionReducer = (state: WidgetState, nodeId: string): WidgetState => {
    const nextState = produce(state, draft => {
        const node = state.conditions[nodeId];
        if (node.condition) {
            const nodeEndId = node.condition.endContentId;
            const nodeEndText = state.conditions[nodeEndId].startContent;
            const newText = node.startContent + nodeEndText;
            draft.conditions[nodeId].startContent = newText;
            draft.activeTextarea.nodeId = nodeId;
            draft.activeTextarea.location = newText.length;
            delete draft.conditions[node.condition.thenClauseId];
            delete draft.conditions[node.condition.elseClauseId];
            delete draft.conditions[node.condition.endContentId];
            delete draft.conditions[node.condition.ifClauseId];
            draft.conditions[nodeId].condition = null;
        }
    });
    return nextState;
};
