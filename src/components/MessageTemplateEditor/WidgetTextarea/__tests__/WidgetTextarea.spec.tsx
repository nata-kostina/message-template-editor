import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { MemoWidgetTextarea } from "../WidgetTextarea";

describe("Widget Textarea", () => {
    it("should render WidgetTextarea component", () => {
        const content = "Content";
        const mockOnChange = jest.fn();
        const mockOnSelect = jest.fn();
        const { getByText, getByRole } = render(<MemoWidgetTextarea
            content={content}
            onChange={mockOnChange}
            onSelect={mockOnSelect}
        />);
        const textarea = getByRole("textbox");
        const text = getByText(content);
        expect(textarea).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

    it("should call select handler", () => {
        const content = "Content";
        const mockOnChange = jest.fn();
        const mockOnSelect = jest.fn();
        const { getByRole } = render(<MemoWidgetTextarea
            content={content}
            onChange={mockOnChange}
            onSelect={mockOnSelect}
        />);
        const textarea = getByRole("textbox");
        fireEvent.select(textarea);
        expect(mockOnSelect).toBeCalled();
    });

    it("should call change handler", () => {
        const content = "Content";
        const mockOnChange = jest.fn();
        const mockOnSelect = jest.fn();
        const { getByRole } = render(<MemoWidgetTextarea
            content={content}
            onChange={mockOnChange}
            onSelect={mockOnSelect}
        />);
        const textarea = getByRole("textbox");
        fireEvent.change(textarea, { target: { value: "New content" } });
        expect(mockOnChange).toBeCalled();
    });
});
