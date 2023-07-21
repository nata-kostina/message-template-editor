import React, { useContext } from "react";
import { WidgetDispatchContext } from "../../contexts/widget/widget.context";
import { deleteCondition } from "../../contexts/widget/widget.action.creators";
import { IConditionNode } from "../../types/widget";
import styles from "./styles.module.css";
import { WidgetTextareaContainer } from "../WidgetTextarea/WidgetTextareaContainer";

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
                <div>
                    <WidgetTextareaContainer
                        nodeId={node.id}
                        content={node.startContent}
                        data-testid="node-start-content"
                    />
                    {node.condition && (
                        <>
                            <div className={styles.condition}>
                                <div className={styles["btn-container"]}>
                                    <button
                                        className={styles.btn}
                                        onClick={deleteConditionBlock}
                                        data-testid="delete-condition"
                                    >
                                        &#215;
                                    </button>
                                    <div className={styles.line} />
                                </div>

                                <div className={styles.block}>
                                    <span
                                        className={styles["block-name"]}
                                        style={{ color: "#6376ab" }}
                                    >IF
                                    </span>
                                    <ConditionNode
                                        nodeId={node.condition.ifClauseId}
                                        template={template}
                                    />
                                </div>
                                <div className={styles.block}>
                                    <span
                                        className={styles["block-name"]}
                                        style={{ color: "#8e4e82" }}
                                    >THEN
                                    </span>
                                    <ConditionNode
                                        nodeId={node.condition.thenClauseId}
                                        template={template}
                                    />
                                </div>
                                <div className={styles.block}>
                                    <span
                                        className={styles["block-name"]}
                                        style={{ color: "#8099ae" }}
                                    >ELSE
                                    </span>
                                    <ConditionNode
                                        nodeId={node.condition.elseClauseId}
                                        template={template}
                                    />
                                </div>

                            </div>
                            <ConditionNode
                                nodeId={node.condition.endContentId}
                                template={template}
                            />
                        </>
                    )}
                </div>
            )}
        </>
    );
};
