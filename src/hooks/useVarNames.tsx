import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { validateVarNames } from "../validation/validate";

const initialArrVarNames = ["firstname", "lastname", "company", "position"];

export const useVarNames = () => {
    const [status, setStatus] = useState<{
        loading: boolean;
        data: string[] | null;
    }>({ loading: true, data: null });

    // get var names from local storage or ["firstname", "lastname", "company", "position"]
    // if they do not exist in local storage
    const [arrVarNames, setArrVarNames] = useLocalStorage<string[]>("arrVarNames", initialArrVarNames);

    useEffect(() => {
        // validate var names
        validateVarNames(arrVarNames)
            .then(() => {
                // if var names are valid, set data to validated var names
                setStatus({ loading: false, data: arrVarNames });
            })
            .catch(() => {
                // if var names are not valid,
                // set data to ["firstname", "lastname", "company", "position"]
                setStatus({ loading: false, data: initialArrVarNames });
            });
    }, [arrVarNames]);

    return { ...status, setArrVarNames };
};
