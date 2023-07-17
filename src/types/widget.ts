import { InferType } from "yup";
import { conditionSchema, varNamesSchema } from "../validation/schemas";

export type CallbackSave = (template: Record<string, IConditionNode>) => Promise<void>;
export type VarNames = InferType<typeof varNamesSchema>;

export type IConditionNode = InferType<typeof conditionSchema>;

export interface IActiveTextarea {
    nodeId: string | null;
    location: number;
}
