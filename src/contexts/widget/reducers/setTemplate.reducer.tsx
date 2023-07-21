import { produce } from "immer";
import { WidgetState } from "../../../types/context";
import { IConditionNode } from "../../../types/widget";

export const setTemplateReducer = (state: WidgetState, template: Record<string, IConditionNode>): WidgetState => {
    const nextState = produce(state, draft => {
        draft.template = template;
    });
    return nextState;
};
