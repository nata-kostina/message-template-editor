import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { validateTemplate } from "../validation/validate";
import { IConditionNode } from "../types/widget";

export const useTemplate = () => {
    const [status, setStatus] = useState<{
        loading: boolean;
        data: Record<string, IConditionNode> | null;
    }>({ loading: true, data: null });

    const [template, setTemplate] = useLocalStorage<Record<string, IConditionNode> | null>("template", null);

    useEffect(() => {
        if (template) {
            validateTemplate(template)
                .then((data) => {
                    setStatus({ loading: false, data });
                })
                .catch(() => {
                    setStatus({ loading: false, data: null });
                });
        }
    }, [template]);

    return { ...status, setTemplate };
};
