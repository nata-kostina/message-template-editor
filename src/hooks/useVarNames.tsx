import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { validateVarNames } from "../validation/validate";
import { VarNames } from "../types/widget";

const initialArrVarNames = ["firstname", "lastname", "company", "position"];

export const useVarNames = () => {
    const [status, setStatus] = useState<{
        loading: boolean;
        data: VarNames | null;
    }>({ loading: true, data: null });

    const [arrVarNames, setArrVarNames] = useLocalStorage<string[]>("arrVarNames", initialArrVarNames);

    useEffect(() => {
        validateVarNames(arrVarNames)
            .then(() => {
                setStatus({ loading: false, data: arrVarNames });
            })
            .catch(() => {
                setStatus({ loading: false, data: initialArrVarNames });
            });
    }, [arrVarNames]);

    return { ...status, setArrVarNames };
};
