import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ConditionNode } from "../ConditionNode";
import { IConditionNode } from "../../../types/widget";
import { WidgetDispatchContext } from "../../../contexts/widget/widget.context";

describe("Condition Node", () => {
    it("should render ConditionNode component", () => {
        const nodeId = "node-1";
        const template: Record<string, IConditionNode> = {
            "node-1": {
                id: "node-1",
                startContent: "Hello!",
                parentId: null,
                condition: null,
            },
        };
        const { getByText } = render(<ConditionNode nodeId={nodeId} template={template} />);
        const textarea = getByText("Hello!");
        expect(textarea).toBeInTheDocument();
    });

    it("should render subwidget if a node has condition", () => {
        const nodeId = "node-1";
        const template: Record<string, IConditionNode> = {
            "node-1": {
                id: "node-1",
                startContent: "Hello!",
                parentId: null,
                condition: {
                    ifClauseId: "if-node",
                    thenClauseId: "then-node",
                    elseClauseId: "else-node",
                    endContentId: "end-node",
                },
            },
            "if-node": {
                id: "if-node",
                startContent: "{company}",
                parentId: "node-1",
                condition: null,
            },
            "then-node": {
                id: "if-node",
                startContent: "\nI know you work at {company}.",
                parentId: "node-1",
                condition: null,
            },
            "else-node": {
                id: "if-node",
                startContent: "\nWhere are you working?",
                parentId: "node-1",
                condition: null,
            },
            "end-node": {
                id: "if-node",
                startContent: "\nRegards",
                parentId: "node-1",
                condition: null,
            },
        };
        const { getByText } = render(<ConditionNode nodeId={nodeId} template={template} />);
        const startContent = getByText("Hello!");
        const ifBlock = getByText("{company}");
        const thenBlock = getByText("I know you work at {company}.");
        const elseBlock = getByText("Where are you working?");
        const endBlock = getByText("Regards");

        expect(startContent).toBeInTheDocument();
        expect(ifBlock).toBeInTheDocument();
        expect(thenBlock).toBeInTheDocument();
        expect(elseBlock).toBeInTheDocument();
        expect(endBlock).toBeInTheDocument();
    });

    it("should dispatch delete condition", () => {
        const mockDispatch = jest.fn();
        const nodeId = "node-1";
        const template: Record<string, IConditionNode> = {
            "node-1": {
                id: "node-1",
                startContent: "Hello!",
                parentId: null,
                condition: {
                    ifClauseId: "if-node",
                    thenClauseId: "then-node",
                    elseClauseId: "else-node",
                    endContentId: "end-node",
                },
            },
            "if-node": {
                id: "if-node",
                startContent: "{company}",
                parentId: "node-1",
                condition: null,
            },
            "then-node": {
                id: "if-node",
                startContent: "\nI know you work at {company}.",
                parentId: "node-1",
                condition: null,
            },
            "else-node": {
                id: "if-node",
                startContent: "\nWhere are you working?",
                parentId: "node-1",
                condition: null,
            },
            "end-node": {
                id: "if-node",
                startContent: "\nRegards",
                parentId: "node-1",
                condition: null,
            },
        };
        const { getByRole } = render(
            <WidgetDispatchContext.Provider value={mockDispatch}>
                <ConditionNode nodeId={nodeId} template={template} />
            </WidgetDispatchContext.Provider>,
        );
        const button = getByRole("button", { name: "Delete condition" });
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(mockDispatch).toBeCalled();
    });
});
