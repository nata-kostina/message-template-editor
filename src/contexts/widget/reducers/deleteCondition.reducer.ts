import { produce } from "immer";
import { WidgetState } from "../../../types/context";

export const deleteConditionReducer = (state: WidgetState, nodeId: string): WidgetState => {
    const nextState = produce(state, draft => {
        const node = draft.conditions[nodeId];
        if (node.condition) {
            const nodeEndId = node.condition.endContentId;
            const nodeEnd = draft.conditions[nodeEndId];
            // join texts of two nodes
            const nodeEndText = nodeEnd.startContent;
            const newText = node.startContent + nodeEndText;
            draft.conditions[nodeId].startContent = newText;
            // delete condition
            delete draft.conditions[node.condition.thenClauseId];
            delete draft.conditions[node.condition.elseClauseId];
            delete draft.conditions[node.condition.ifClauseId];

            // if there is condition in the end node
            if (nodeEnd.condition) {
                // replace condition of current node with end-node condition
                node.condition.ifClauseId = nodeEnd.condition.ifClauseId;
                node.condition.thenClauseId = nodeEnd.condition.thenClauseId;
                node.condition.elseClauseId = nodeEnd.condition.elseClauseId;
                node.condition.endContentId = nodeEnd.condition.endContentId;

                // change parent ID for condition nodes
                draft.conditions[node.condition.ifClauseId].parentId = nodeId;
                draft.conditions[node.condition.thenClauseId].parentId = nodeId;
                draft.conditions[node.condition.elseClauseId].parentId = nodeId;
                draft.conditions[node.condition.endContentId].parentId = nodeId;
            } else {
                // if there is no condition in the end-node
                draft.conditions[nodeId].condition = null;
            }
            // delete end-node
            delete draft.conditions[nodeEndId];
            // change active textarea
            draft.activeTextarea.nodeId = nodeId;
            draft.activeTextarea.location = newText.length;
        }
    });
    return nextState;
};
