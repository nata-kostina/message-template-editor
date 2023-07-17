import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IActiveTextarea, IConditionNode } from "../../types/widget";
import { WidgetSliceState } from "../types";
import { initRootConditionReducer } from "./reducers/initRootCondition.reducer";
import { addConditionReducer } from "./reducers/addCondition.reducer";
import { addVarNameReducer } from "./reducers/addVarName.reducer";
import { deleteConditionReducer } from "./reducers/deleteCondition.reducer";

const initialState: WidgetSliceState = {
    rootConditionId: null,
    conditions: {},
    activeTextarea: { nodeId: null, location: 0 },
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
            }>,
        ) => {
            const { nodeId, content } = payload;
            const node = state.conditions[nodeId];
            if (node) {
                node.startContent = content;
            }
        },
        deleteCondition: deleteConditionReducer,
        addVarName: addVarNameReducer,
        changeActiveTextarea: (state, action: PayloadAction<IActiveTextarea>) => {
            const { nodeId, location } = action.payload;
            if (state.activeTextarea.nodeId !== nodeId
                || state.activeTextarea.location !== location) {
                state.activeTextarea.nodeId = nodeId;
                state.activeTextarea.location = location;
            }
        },
        setConditions: (state, { payload: conditions }: PayloadAction<Record<string, IConditionNode>>) => {
            state.conditions = conditions;
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
    setConditions,
} = widgetSlice.actions;
export const widgetReducer = widgetSlice.reducer;
