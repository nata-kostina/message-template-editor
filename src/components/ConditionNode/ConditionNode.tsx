import React, { useContext } from "react";
import { WidgetDispatchContext } from "../../contexts/widget/widget.context";
import { WidgetTextareaContainer } from "../MessageTemplateEditor/WidgetTextarea/WidgetTextareaContainer";
import { deleteCondition } from "../../contexts/widget/widget.action.creators";
import { IConditionNode } from "../../types/widget";

interface Props {
    nodeId: string;
    template: Record<string, IConditionNode>;
}

export const ConditionNode = ({ nodeId, template }: Props) => {
    const dispatch = useContext(WidgetDispatchContext);
    const node = template[nodeId];
    const deleteConditionBlock = () => dispatch(deleteCondition(nodeId));
    return (
        <>
            {node && (
                <div style={{ width: "100%" }}>
                    <WidgetTextareaContainer
                        nodeId={node.id}
                        content={node.startContent}
                        data-testid="node-start-content"
                    />
                    {node.condition && (
                        <div>
                            <div style={{ paddingLeft: "50px", width: "100%" }}>
                                <div>
                                    IF:{" "}
                                    <span>
                                        <ConditionNode nodeId={node.condition.ifClauseId} template={template} />
                                    </span>
                                </div>
                                <div>
                                    THEN:{" "}
                                    <span>
                                        <ConditionNode nodeId={node.condition.thenClauseId} template={template} />
                                    </span>
                                </div>
                                <div>
                                    ELSE:{" "}
                                    <span>
                                        <ConditionNode nodeId={node.condition.elseClauseId} template={template} />
                                    </span>
                                </div>

                                <button onClick={deleteConditionBlock}>
                                    Delete condition
                                </button>
                            </div>
                            <span>
                                <ConditionNode nodeId={node.condition.endContentId} template={template} />
                            </span>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
