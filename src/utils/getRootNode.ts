import { v4 as uuidv4 } from "uuid";
import { IConditionNode } from "../types/widget";

export const getRootNode = (template: Record<string, IConditionNode> | null): IConditionNode => {
    if (template) {
        const rootId = Object.values(template).find((condition) => !condition.parentId)?.id;
        if (rootId) {
            return template[rootId];
        }
    }
    return generateNode("");
};

const generateNode = (content: string, parentId?: string): IConditionNode => {
    return {
        id: uuidv4(),
        parentId: parentId || null,
        startContent: content,
        condition: null,
    };
};
