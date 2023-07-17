import { PayloadAction } from "@reduxjs/toolkit";
import { WidgetSliceState } from "../../types";

export const deleteConditionReducer = (state: WidgetSliceState, action: PayloadAction<string>) => {
    const node = state.conditions[action.payload];
    if (node) {
        if (node.condition) {
            node.startContent += state.conditions[node.condition.endContentId].startContent;
            delete state.conditions[node.condition.thenClauseId];
            delete state.conditions[node.condition.elseClauseId];
            delete state.conditions[node.condition.endContentId];
        }
        node.condition = null;
        state.activeTextarea.nodeId = node.id;
        state.activeTextarea.type = "template";
        state.activeTextarea.location = node.startContent.length;
    }
};
