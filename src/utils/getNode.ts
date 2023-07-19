import { IConditionNode } from "../types/widget";
import { assertNever } from "./assertNever";

export const getSubNode = (node: IConditionNode, template: Record<string, IConditionNode>,
    type: "if" | "then" | "else" | "end" | "root"): IConditionNode | null => {
    switch (type) {
        case "if":
            return node?.condition ? template[node.condition.ifClauseId] : null;
        case "then":
            return node?.condition ? template[node.condition.thenClauseId] : null;
        case "else":
            return node?.condition ? template[node.condition.elseClauseId] : null;
        case "end":
            return node?.condition ? template[node.condition.endContentId] : null;
        case "root":
            const rootId = Object.values(template).find((condition) => !condition.parentId)?.id;
            return rootId ? template[rootId] : null;
        default:
            assertNever(type);
    }
};

export const getRootNode = (template: Record<string, IConditionNode> | null): IConditionNode | null => {
    if (template) {
        const rootId = Object.values(template).find((condition) => !condition.parentId)?.id;
        if (rootId) {
            return template[rootId];
        }
    }
    return null;
};
