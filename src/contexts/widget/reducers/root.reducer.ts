import { Action, Actions, WidgetState } from "../../../types/context";
import { addConditionReducer } from "./addCondition.reducer";
import { addVarNameReducer } from "./addVarName.reducer";
import { initRootConditionReducer } from "./initRootCondition.reducer";
import { setActiveTextareaReducer } from "./setActiveTextarea.reducer";
import { setConditionsReducer } from "./setConditions.reducer";
import { setContentReducer } from "./setContent.reducer";
import { deleteConditionReducer } from "./deleteCondition.reducer";

export const rootReducer = (state: WidgetState, action: Action): WidgetState => {
    switch (action.type) {
        case Actions.addCondition:
            return addConditionReducer(state);
        case Actions.initRootCondition:
            return initRootConditionReducer(state);
        case Actions.setActiveTextarea:
            return setActiveTextareaReducer(state, action.payload);
        case Actions.setConditions:
            return setConditionsReducer(state, action.payload);
        case Actions.setContent:
            return setContentReducer(state, action.payload);
        case Actions.addVarName:
            return addVarNameReducer(state, action.payload);
        case Actions.deleteCondition:
            return deleteConditionReducer(state, action.payload);
        default:
            return state;
    }
};
