import { InferType } from "yup";
import { conditionSchema } from "../validation/schemas";

export type CallbackSave = (template: Record<string, IConditionNode>) => Promise<void>;

export type IConditionNode = InferType<typeof conditionSchema>;

export interface IActiveTextarea {
    nodeId: string | null;
    location: number;
}
