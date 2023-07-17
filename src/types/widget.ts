import { InferType } from "yup";
import { varNamesSchema } from "../validation/schemas";

export type CallbackSave = (template: string) => Promise<void>;
export type VarNames = InferType<typeof varNamesSchema>;

export interface IConditionNode {
    id: string;
    parentId: string | null;
    startContent: string;
    condition: {
        conditionClause: string;
        thenClauseId: string;
        elseClauseId: string;
        endContentId: string;
    } | null;

}

export interface IActiveTextarea {
    nodeId: string | null;
    type: "template" | "condition";
    location: number;
}
