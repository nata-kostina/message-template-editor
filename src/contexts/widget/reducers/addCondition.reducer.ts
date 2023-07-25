import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";
import { IConditionNode } from "../../../types/widget";
import { WidgetState } from "../../../types/context";

export const addConditionReducer = (state: WidgetState): WidgetState => {
    const nextState = produce(state, draft => {
        const { nodeId, location } = draft.activeTextarea; // get id of active textarea
        const node = nodeId ? draft.conditions[nodeId] : null; // get node by id
        const parentNode = node?.parentId ? draft.conditions[node.parentId] : null; // get parent node
        // forbid adding condition to if-block
        if (parentNode?.condition?.ifClauseId === nodeId) {
            return;
        }

        if (nodeId && node) {
            // create new nodes for a new condition
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
            // add new nodes to conditions
            draft.conditions[ifClauseNode.id] = ifClauseNode;
            draft.conditions[thenClauseNode.id] = thenClauseNode;
            draft.conditions[elseClauseNode.id] = elseClauseNode;
            draft.conditions[endNode.id] = endNode;
            // if condition already exists
            if (node.condition) {
                // move existing condition down to the end-node
                endNode.condition = node.condition;
                // change parentId of the old condition nodes
                draft.conditions[endNode.condition.ifClauseId].parentId = endNode.id;
                draft.conditions[endNode.condition.thenClauseId].parentId = endNode.id;
                draft.conditions[endNode.condition.elseClauseId].parentId = endNode.id;
                draft.conditions[endNode.condition.endContentId].parentId = endNode.id;
            }
            // set new condition to the active node
            draft.conditions[nodeId].condition = newCondition;
            // change text of the active node
            const newStartContent = node.startContent.slice(0, location ?? 0);
            draft.conditions[nodeId].startContent = newStartContent;
            // set new if-block as active textarea
            draft.activeTextarea = { nodeId: ifClauseNode.id, location: 0 };
        }
    });
    return nextState;
};
