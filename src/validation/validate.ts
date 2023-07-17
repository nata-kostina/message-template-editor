import { templateSchema, varNamesSchema } from "./schemas";

export const validateVarNames = async <T>(value: T) => {
    try {
        await varNamesSchema.validate(value);
    } catch (err) {
        throw new Error("Error! [Local Storage] - Invalid value for `arrVarNames`");
    }
};
export const validateTemplate = async <T>(value: T) => {
    try {
        await templateSchema.validate(value);
    } catch (err) {
        throw new Error("Error! [Local Storage] - Invalid value for `template`");
    }
};
