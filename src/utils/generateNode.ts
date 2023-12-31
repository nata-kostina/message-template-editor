import { v4 as uuidv4 } from "uuid";
import { IConditionNode } from "../types/widget";

export const generateNode = (content: string, parentId?: string): IConditionNode => {
    return {
        id: uuidv4(),
        parentId: parentId || null,
        startContent: content,
        condition: null,
    };
};
