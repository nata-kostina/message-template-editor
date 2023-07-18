import React, { createContext, useReducer } from "react";
import { Action, WidgetState } from "../../types/context";
import { rootReducer } from "./reducers/root.reducer";

const initialState: WidgetState = {
    rootConditionId: null,
    conditions: {},
    activeTextarea: { nodeId: null, location: 0 },
};
export const WidgetContext = createContext<WidgetState>(initialState);
export const WidgetDispatchContext = createContext<React.Dispatch<Action>>(() => {});

interface WidgetProviderProps {
    children: React.ReactNode;
}

export const WidgetProvider = ({ children }: WidgetProviderProps) => {
    const [widget, dispatch] = useReducer(rootReducer, initialState);
    return (
        <WidgetContext.Provider value={widget}>
            <WidgetDispatchContext.Provider value={dispatch}>
                {children}
            </WidgetDispatchContext.Provider>
        </WidgetContext.Provider>
    );
};
