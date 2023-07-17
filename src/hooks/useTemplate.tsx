import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { validateTemplate } from "../validation/validate";

export const useTemplate = () => {
    const [status, setStatus] = useState<{
        loading: boolean;
        data?: string | null;
    }>({ loading: true });

    const [template, setTemplate] = useLocalStorage<string | null>("template", null);

    useEffect(() => {
        validateTemplate(template)
            .then(() => {
                setStatus({ loading: false, data: template });
            })
            .catch(() => {
                setStatus({ loading: false, data: null });
            });
    }, [template]);

    return { ...status, setTemplate };
};
