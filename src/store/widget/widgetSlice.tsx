import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IActiveTextarea } from "../../types/widget";
import { WidgetSliceState } from "../types";
import { initRootConditionReducer } from "./reducers/initRootCondition.reducer";
import { addConditionReducer } from "./reducers/addCondition.reducer";
import { addVarNameReducer } from "./reducers/addVarName.reducer";
import { deleteConditionReducer } from "./reducers/deleteCondition.reducer";
import { assertNever } from "../../utils/assertNever";

const initialState: WidgetSliceState = {
    rootConditionId: null,
    conditions: {},
    activeTextarea: { nodeId: null, type: "template", location: 0 },
};

export const widgetSlice = createSlice({
    name: "widget",
    initialState,
    reducers: {
        initRootCondition: initRootConditionReducer,
        addCondition: addConditionReducer,
        setContent: (
            state,
            {
                payload,
            }: PayloadAction<{
                nodeId: string;
                content: string;
                type: "template" | "condition";
            }>,
        ) => {
            const { nodeId, type, content } = payload;
            const node = state.conditions[nodeId];
            if (node) {
                switch (type) {
                    case "template":
                        node.startContent = content;
                        break;
                    case "condition":
                        if (node.condition) {
                            node.condition.conditionClause = payload.content;
                        }
                        break;
                    default:
                        assertNever(type);
                }
            }
        },
        deleteCondition: deleteConditionReducer,
        addVarName: addVarNameReducer,
        changeActiveTextarea: (state, action: PayloadAction<IActiveTextarea>) => {
            const { nodeId, type, location } = action.payload;
            if (state.activeTextarea.nodeId !== nodeId || state.activeTextarea.type !== type
                || state.activeTextarea.location !== location) {
                state.activeTextarea.nodeId = nodeId;
                state.activeTextarea.type = type;
                state.activeTextarea.location = location;
            }
        },
    },
});
export const {
    addCondition,
    initRootCondition,
    setContent,
    deleteCondition,
    addVarName,
    changeActiveTextarea,
} = widgetSlice.actions;
export const widgetReducer = widgetSlice.reducer;
