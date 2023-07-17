import { PayloadAction } from "@reduxjs/toolkit";
import { assertNever } from "../../../utils/assertNever";
import { WidgetSliceState } from "../../types";

export const addVarNameReducer = (state: WidgetSliceState, { payload: varName }: PayloadAction<string>) => {
    const { nodeId, type, location } = state.activeTextarea;
    const node = nodeId ? state.conditions[nodeId] : null;
    if (node) {
        switch (type) {
            case "template":
                const newText = `${node.startContent.slice(0, location)}{${varName}}${node.startContent.slice(location)}`;
                node.startContent = newText;
                state.activeTextarea.location += varName.length + 2;
                break;
            case "condition":
                if (node.condition) {
                    const condition = node.condition.conditionClause;
                    const newCondition = `${condition.slice(0, location)}{${varName}}${condition.slice(location)}`;
                    node.condition.conditionClause = newCondition;
                    state.activeTextarea.location += varName.length + 2;
                }
                break;
            default:
                assertNever(type);
        }
    }
};
