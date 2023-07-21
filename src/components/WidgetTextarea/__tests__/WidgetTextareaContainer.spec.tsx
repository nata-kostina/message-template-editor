import React from "react";
import { render } from "@testing-library/react";
import { WidgetTextareaContainer } from "../WidgetTextareaContainer";
import { WidgetContext } from "../../../contexts/widget/widget.context";
import { WidgetState } from "../../../types/context";

describe("Widget Textarea Container", () => {
    beforeEach(() => {
        const spyFunc = jest.fn().mockReturnValue(true);
        Object.defineProperty(global.document, "hasFocus", { value: spyFunc, writable: true });
    });
    it("should render WidgetTextareaContainer component", () => {
        const content = "Content";
        const nodeId = "node-1";
        const { getByText, getByRole } = render(<WidgetTextareaContainer
            content={content}
            nodeId={nodeId}
        />);
        const textarea = getByRole("textbox");
        const text = getByText(content);
        expect(textarea).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

    it("should focus on active textarea", () => {
        const content = "Content";
        const nodeId = "node-1";
        const mockWidgetContext: WidgetState = {
            conditions: {},
            activeTextarea: {
                nodeId,
                location: 5,
            },
        };
        const { getByRole } = render(
            <WidgetContext.Provider value={mockWidgetContext}>
                <WidgetTextareaContainer
                    content={content}
                    nodeId={nodeId}
                />
            </WidgetContext.Provider>,
        );
        const textarea = getByRole("textbox");
        expect(textarea).toHaveFocus();
    });

    it("should not focus on non-active textarea", () => {
        const content = "Content";
        const nodeId = "node-1";
        const mockWidgetContext: WidgetState = {
            conditions: {},
            activeTextarea: {
                nodeId: "node-2",
                location: 5,
            },
        };

        const { getByRole } = render(
            <WidgetContext.Provider value={mockWidgetContext}>
                <WidgetTextareaContainer
                    content={content}
                    nodeId={nodeId}
                />
            </WidgetContext.Provider>,
        );
        const textarea = getByRole("textbox");
        expect(textarea).not.toHaveFocus();
    });
});
