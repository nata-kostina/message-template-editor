import { PayloadAction } from "@reduxjs/toolkit";
import { WidgetSliceState } from "../../types";

export const addVarNameReducer = (state: WidgetSliceState, { payload: varName }: PayloadAction<string>) => {
    const { nodeId, location } = state.activeTextarea;
    const node = nodeId ? state.conditions[nodeId] : null;
    if (node) {
        const newText = `${node.startContent.slice(0, location)}{${varName}}${node.startContent.slice(location)}`;
        node.startContent = newText;
        state.activeTextarea.location += varName.length + 2;
    }
};
