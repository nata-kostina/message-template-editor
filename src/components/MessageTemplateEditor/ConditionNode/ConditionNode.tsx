import React, { useContext } from "react";
import { WidgetContext, WidgetDispatchContext } from "../../../contexts/widget/widget.context";
import { WidgetTextareaContainer } from "../WidgetTextarea/WidgetTextareaContainer";
import { deleteCondition } from "../../../contexts/widget/widget.action.creators";

interface Props {
    nodeId: string;
}

export const ConditionNode = ({ nodeId }: Props) => {
    const { conditions } = useContext(WidgetContext);
    const dispatch = useContext(WidgetDispatchContext);
    const node = conditions[nodeId];
    const deleteConditionBlock = () => dispatch(deleteCondition(nodeId));
    return (
        <>
            {node && (
                <div style={{ width: "100%" }}>
                    <WidgetTextareaContainer node={node} />
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
};
