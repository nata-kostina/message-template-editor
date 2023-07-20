import { IConditionNode, IActiveTextarea } from "./widget";

export type WidgetState = {
    conditions: Record<string, IConditionNode>;
    activeTextarea: IActiveTextarea;
};

export enum Actions {
    initRootCondition = "widget/initRootCondition",
    addCondition = "widget/addCondition",
    setActiveTextarea = "widget/setActiveTextarea",
    setConditions = "widget/setConditions",
    setContent = "widget/setContent",
    addVarName = "widget/addVerName",
    deleteCondition = "widget/deleteCondition",
}

export type InitRootAction = { type: Actions.initRootCondition; payload: IConditionNode; };
export type AddConditionAction = { type: Actions.addCondition; };
export type SetActiveTextareaAction = { type: Actions.setActiveTextarea; payload: IActiveTextarea; };
export type SetConditionsAction = { type: Actions.setConditions; payload: Record<string, IConditionNode>; };
export type SetContentAction = { type: Actions.setContent; payload: { nodeId: string; content: string; }; };
export type AddVarNameAction = { type: Actions.addVarName; payload: string; };
export type DeleteConditionAction = { type: Actions.deleteCondition; payload: string; };

export type Action = InitRootAction |
AddConditionAction |
SetActiveTextareaAction |
SetConditionsAction |
SetContentAction |
AddVarNameAction |
DeleteConditionAction;
