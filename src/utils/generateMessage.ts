import { IConditionNode } from "../types/widget";
import { getRootNode, getSubNode } from "./getNode";

export const generateMessage = (values: Record<string, string | null>,
    template: Record<string, IConditionNode>): string => {
    const rootCondition = getRootNode(template);
    if (!rootCondition) { return ""; }
    const node: IConditionNode | null = rootCondition;
    const message = traverseNode(node, values, template);

    return message;
};

const traverseNode = (node: IConditionNode | null,
    values: Record<string, string | null>,
    template: Record<string, IConditionNode>): string => {
    if (!node) { return ""; }
    let message = mapValuesToContent(node.startContent, values);

    const ifNode = getSubNode(node, template, "if");

    if (!ifNode) {
        return message;
    }

    const ifMessage = mapValuesToContent(ifNode.startContent, values);
    const thenNode = getSubNode(node, template, "then");
    const elseNode = getSubNode(node, template, "else");
    const endNode = getSubNode(node, template, "end");

    if (ifMessage.length > 0) {
        if (thenNode) {
            message += traverseNode(thenNode, values, template);
        }
    } else if (elseNode) {
        message += traverseNode(elseNode, values, template);
    }
    if (endNode) {
        message += traverseNode(endNode, values, template);
    }

    return message;
};

const mapValuesToContent = (content: string, values: Record<string, string | null>): string => {
    let result = content;
    Object.entries(values).forEach(([name, value]) => {
        result = result.replaceAll(`{${name}}`, value || "");
    });

    return result;
};
