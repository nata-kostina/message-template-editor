import { array, string, object } from "yup";

export const varNamesSchema = array().of(string().required()).required();
export const conditionSchema = object({
    id: string().required(),
    parentId: string().nullable().defined(),
    startContent: string().required(),
    condition: object({
        ifClauseId: string().required(),
        thenClauseId: string().required(),
        elseClauseId: string().required(),
        endContentId: string().required(),
    }).nullable().defined(),
});
