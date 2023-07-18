import { produce } from "immer";
import { WidgetState } from "../../../types/context";

export const addVarNameReducer = (state: WidgetState, varName: string): WidgetState => {
    const nextState = produce(state, draft => {
        const { nodeId, location } = draft.activeTextarea;
        const node = nodeId ? draft.conditions[nodeId] : null;
        if (nodeId && node) {
            const newText = `${node.startContent.slice(0, location)}{${varName}}${node.startContent.slice(location)}`;
            draft.conditions[nodeId].startContent = newText;
            draft.activeTextarea.nodeId = nodeId;
            draft.activeTextarea.location += varName.length + 2;
        }
    });
    return nextState;
};
