import { PayloadAction } from "@reduxjs/toolkit";
import { IConditionNode } from "../../../types/widget";
import { WidgetSliceState } from "../../types";

export const initRootConditionReducer = (state: WidgetSliceState, { payload: node }: PayloadAction<IConditionNode>) => {
    state.rootConditionId = node.id;
    state.conditions[node.id] = node;
    state.activeTextarea.nodeId = node.id;
    state.activeTextarea.type = "template";
    state.activeTextarea.location = node.startContent.length;
};
