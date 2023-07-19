import { IConditionNode } from "../types/widget";
import { conditionSchema, varNamesSchema } from "./schemas";

export const validateVarNames = async <T>(value: T) => {
    try {
        await varNamesSchema.validate(value);
    } catch (err) {
        throw new Error("Error! [Local Storage] - Invalid value for `arrVarNames`");
    }
};

export const validateTemplate = async (template: Record<string, IConditionNode> | null): Promise<Record<string, IConditionNode> | null> => {
    try {
        if (!template) { return template; }
        const validatingConditions = Object.values(template).map((condition) =>
            validateCondition(condition));
        const validatedConditions = await Promise.all(validatingConditions);
        const result: Record<string, IConditionNode> = {};
        validatedConditions.forEach((condition) => {
            result[condition.id] = condition;
        });
        return result;
    } catch (err) {
        throw new Error("Error! [Local Storage] - Invalid value for `template`");
    }
};
export const validateCondition = async <T>(value: T): Promise<IConditionNode> => {
    try {
        const result = await conditionSchema.validate(value);
        return result;
    } catch (err) {
        throw new Error("Error! Invalid template");
    }
};
