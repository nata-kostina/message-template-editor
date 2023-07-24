import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { validateTemplate } from "../validation/validate";
import { IConditionNode } from "../types/widget";

export const useTemplate = () => {
    const [status, setStatus] = useState<{
        loading: boolean;
        data: Record<string, IConditionNode> | null;
    }>({ loading: true, data: null });

    // get template from local storage or null if it does not exist in local storage
    const [template, setTemplate] = useLocalStorage<Record<string, IConditionNode> | null>("template", null);

    useEffect(() => {
        // validate template
        validateTemplate(template)
            .then((data) => {
                // if template is valid, set data to validated template
                setStatus({ loading: false, data });
            })
            .catch(() => {
                // if template is not valid, set data to null
                setStatus({ loading: false, data: null });
            });
    }, [template]);

    return { ...status, setTemplate };
};
