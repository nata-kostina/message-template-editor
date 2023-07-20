import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { MessagePreview } from "../MessagePreview";

describe("Message Preview", () => {
    let values: Record<string, string | null> = {};
    let message = "";
    const mockTogglePreview = jest.fn();
    const mockOnChange = jest.fn();
    beforeEach(() => {
        values = {};
        message = "";
    });
    it("should render MessagePreview component", () => {
        message = "Message";
        const { getByRole, getByDisplayValue } = render(<MessagePreview
            message={message}
            values={values}
            onChange={mockOnChange}
            togglePreview={mockTogglePreview}
        />);
        const form = getByRole("form");
        const textarea = getByDisplayValue("Message");
        const button = getByRole("button", { name: /Close/i });
        expect(form).toBeInTheDocument();
        expect(textarea).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it("should call click hadler", () => {
        const { getByRole } = render(<MessagePreview
            message={message}
            values={values}
            onChange={mockOnChange}
            togglePreview={mockTogglePreview}
        />);
        const button = getByRole("button", { name: /Close/i });
        fireEvent.click(button);
        expect(mockTogglePreview).toBeCalled();
    });
});
