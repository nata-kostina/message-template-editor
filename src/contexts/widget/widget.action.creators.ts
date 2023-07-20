import {
    Actions, AddConditionAction, AddVarNameAction,
    DeleteConditionAction,
    InitRootAction, SetActiveTextareaAction, SetConditionsAction, SetContentAction,
} from "../../types/context";
import { IConditionNode, IActiveTextarea } from "../../types/widget";

export const initRoot = (payload: IConditionNode): InitRootAction => ({ type: Actions.initRootCondition, payload });

export const addCondition = (): AddConditionAction => ({ type: Actions.addCondition });

export const setActiveTextarea = (payload: IActiveTextarea): SetActiveTextareaAction =>
    ({ type: Actions.setActiveTextarea, payload });

export const setConditions = (payload: Record<string, IConditionNode>): SetConditionsAction =>
    ({ type: Actions.setConditions, payload });

export const setContent = (payload: { nodeId: string; content: string; }): SetContentAction =>
    ({ type: Actions.setContent, payload });

export const addVarName = (payload: string): AddVarNameAction =>
    ({ type: Actions.addVarName, payload });

export const deleteCondition = (payload: string): DeleteConditionAction =>
    ({ type: Actions.deleteCondition, payload });
