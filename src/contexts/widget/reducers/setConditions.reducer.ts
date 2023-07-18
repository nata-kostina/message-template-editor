import { produce } from "immer";
import { WidgetState } from "../../../types/context";
import { IConditionNode } from "../../../types/widget";

export const setConditionsReducer = (state: WidgetState, conditions: Record<string, IConditionNode>): WidgetState => {
    const nextState = produce(state, draft => {
        draft.conditions = conditions;
    });
    return nextState;
};
