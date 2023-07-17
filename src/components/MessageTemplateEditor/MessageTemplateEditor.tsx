import React, { useEffect } from "react";
import { CallbackSave, VarNames } from "../../types/widget";
import { ConditionNode } from "./ConditionNode/ConditionNode";
import { VarNamesList } from "../VarNamesList/VarNamesList";
import {
    addCondition,
    addVarName,
    initRootCondition,
} from "../../store/widget/widgetSlice";
import { generateConditionNode } from "../../utils/generateConditionNode";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

interface Props {
    arrVarNames: VarNames;
    template?: string | null;
    callbackSave: CallbackSave;
}

export const MessageTemplateEditor = ({
    arrVarNames,
    template,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    callbackSave,
}: Props) => {
    const dispatch = useAppDispatch();
    const rootConditionId = useAppSelector((state) => state.widget.rootConditionId);
    useEffect(() => {
        const rootNode = generateConditionNode(template || "");
        dispatch(initRootCondition(rootNode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAddConditionClick = () => {
        dispatch(addCondition());
    };
    const addVarNameFn = (varName: string) => {
        dispatch(addVarName(varName));
    };
    return (
        <>
            {rootConditionId && (
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <VarNamesList arrVarNames={arrVarNames} addVarName={addVarNameFn} />
                        <button onClick={onAddConditionClick}>IF-THEN-ELSE</button>
                        <ConditionNode nodeId={rootConditionId} />
                        <button>Save</button>
                    </div>
                </>
            )}
        </>
    );
};
