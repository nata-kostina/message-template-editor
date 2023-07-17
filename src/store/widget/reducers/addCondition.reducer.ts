import { v4 as uuidv4 } from "uuid";
import { WidgetSliceState } from "../../types";
import { IConditionNode } from "../../../types/widget";

export const addConditionReducer = (state: WidgetSliceState) => {
    const { nodeId, location } = state.activeTextarea;
    const node = nodeId ? state.conditions[nodeId] : null;

    if (node && !node.condition) {
        const endNode: IConditionNode = {
            id: uuidv4(),
            parentId: nodeId,
            startContent: node.startContent.slice(location),
            condition: null,
        };
        state.conditions[endNode.id] = endNode;
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
        node.condition = {
            conditionClause: "",
            thenClauseId: thenClauseNode.id,
            elseClauseId: elseClauseNode.id,
            endContentId: endNode.id,
        };
        node.startContent = node.startContent.slice(0, location ?? 0);
        state.conditions[node.condition.thenClauseId] = thenClauseNode;
        state.conditions[node.condition.elseClauseId] = elseClauseNode;
        state.activeTextarea.nodeId = node.id;
        state.activeTextarea.location = 0;
        state.activeTextarea.type = "condition";
    }
};
