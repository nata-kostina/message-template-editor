import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";
import { IConditionNode } from "../../../types/widget";
import { WidgetState } from "../../../types/context";

export const addConditionReducer = (state: WidgetState): WidgetState => {
    const nextState = produce(state, draft => {
        const { nodeId, location } = draft.activeTextarea;
        const node = nodeId ? draft.conditions[nodeId] : null;
        const parentNode = node?.parentId ? draft.conditions[node.parentId] : null;
        if (parentNode?.condition?.ifClauseId === nodeId) {
            return;
        }
        if (nodeId && node && !node.condition) {
            const endNode: IConditionNode = {
                id: uuidv4(),
                parentId: nodeId,
                startContent: node.startContent.slice(location),
                condition: null,
            };
            const thenClauseNode: IConditionNode = {
                id: uuidv4(),
                parentId: nodeId,
                startContent: "",
                condition: null,
            };
            const elseClauseNode: IConditionNode = {
                id: uuidv4(),
                parentId: nodeId,
                startContent: "",
                condition: null,
            };
            const ifClauseNode: IConditionNode = {
                id: uuidv4(),
                parentId: nodeId,
                startContent: "",
                condition: null,
            };
            const newCondition = {
                ifClauseId: ifClauseNode.id,
                thenClauseId: thenClauseNode.id,
                elseClauseId: elseClauseNode.id,
                endContentId: endNode.id,
            };
            const newStartContent = node.startContent.slice(0, location ?? 0);
            draft.activeTextarea = { nodeId: ifClauseNode.id, location: 0 };
            draft.conditions[nodeId].condition = newCondition;
            draft.conditions[nodeId].startContent = newStartContent;
            draft.conditions[ifClauseNode.id] = ifClauseNode;
            draft.conditions[thenClauseNode.id] = thenClauseNode;
            draft.conditions[elseClauseNode.id] = elseClauseNode;
            draft.conditions[endNode.id] = endNode;
        }
    });
    return nextState;
};
