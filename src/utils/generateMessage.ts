import { IConditionNode } from "../types/widget";
import { getRootNode, getSubNode } from "./getNode";

export const generateMessage = (
    values: Record<string, string | null>,
    template: Record<string, IConditionNode>,
): string => {
    const rootCondition = getRootNode(template);
    if (!rootCondition) {
        return "";
    }
    const node: IConditionNode | null = rootCondition;
    const message = traverseNode(node, values, template); // traverse through each condition

    return message;
};

const traverseNode = (
    node: IConditionNode | null,
    values: Record<string, string | null>,
    template: Record<string, IConditionNode>,
): string => {
    if (!node) {
        return "";
    }
    let message = mapValuesToContent(node.startContent, values); // replace variables with values

    const ifNode = getSubNode(node, template, "if"); // get if-block

    if (!ifNode) {
        return message;
    }

    const ifMessage = mapValuesToContent(ifNode.startContent, values);
    const thenNode = getSubNode(node, template, "then"); // get then-block
    const elseNode = getSubNode(node, template, "else"); // get else-block
    const endNode = getSubNode(node, template, "end"); // get end-node

    if (ifMessage.length > 0) {
    // if condition is not null
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

const mapValuesToContent = (
    content: string,
    values: Record<string, string | null>,
): string => {
    let result = content;

    const varNames = Object.keys(values);
    let i = 0;
    while (i < result.length) { // iterate through result string
        if (result[i] === "{") { // if open bracket is found
            let j = i + 1;
            while (j < result.length) { // iterate to look for the closing bracket
                if (result[j] === "}") { // if close bracket is found
                    const possibleVariable = result.slice(i + 1, j); // string between brackets
                    // if there is such variable name
                    if (varNames.includes(possibleVariable)) {
                        const replacedValue = values[possibleVariable]; // try to get value by its name
                        // if the value for such variable name is null
                        if (!replacedValue) {
                            // replace the variable name with empty string
                            result = "".concat(result.slice(0, i), result.slice(j + 1));
                        } else {
                            // replace the variable name with the variable value
                            result = "".concat(
                                result.slice(0, i),
                                replacedValue,
                                result.slice(j + 1),
                            );
                            i += replacedValue.length; // go to the index next to the inserted variable value
                        }
                        break; // stop searching for closing bracket
                    }
                }
                j++; // continue searching for closing bracket
            }
            // if closing bracket is not found, move to the next symbol of the string
            if (j === result.length) {
                i++;
            }
        } else { // if the current string symbol is not the opening bracket
            i++; // go to the next symbol
        }
    }

    return result;
};
