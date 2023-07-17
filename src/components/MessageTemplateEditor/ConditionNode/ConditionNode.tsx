import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { deleteCondition } from "../../../store/widget/widgetSlice";
import { WidgetTextarea } from "../WidgetTextarea/WidgetTextarea";

interface Props {
    nodeId: string;
}

export const ConditionNode = React.memo(({ nodeId }: Props) => {
    const dispatch = useAppDispatch();
    const node = useAppSelector((state) => state.widget.conditions[nodeId]);
    const deleteConditionBlock = () => dispatch(deleteCondition(nodeId));
    return (
        <>
            {node && (
                <div style={{ width: "100%" }}>
                    <WidgetTextarea
                        node={node}
                        content={node.startContent}
                        type="template"
                    />
                    {node.condition && (
                        <div>
                            <div style={{ paddingLeft: "50px", width: "100%" }}>
                                <div>
                                    IF:{" "}
                                    <span>
                                        <ConditionNode nodeId={node.condition.ifClauseId} />
                                    </span>
                                </div>
                                <div>
                                    THEN:{" "}
                                    <span>
                                        <ConditionNode nodeId={node.condition.thenClauseId} />
                                    </span>
                                </div>
                                <div>
                                    ELSE:{" "}
                                    <span>
                                        <ConditionNode nodeId={node.condition.elseClauseId} />
                                    </span>
                                </div>

                                <button onClick={deleteConditionBlock}>
                                    Delete condition
                                </button>
                            </div>
                            <ConditionNode nodeId={node.condition.endContentId} />
                        </div>
                    )}
                </div>
            )}
        </>
    );
});
ConditionNode.displayName = "ConditionNode";
