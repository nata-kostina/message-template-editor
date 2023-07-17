import { IConditionNode, IActiveTextarea } from "../types/widget";

export type WidgetSliceState = {
    rootConditionId: null | string;
    conditions: Record<string, IConditionNode>;
    activeTextarea: IActiveTextarea;
};
