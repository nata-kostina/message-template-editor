import { array, string } from "yup";

export const varNamesSchema = array().of(string().required()).required();
export const templateSchema = string().required();
