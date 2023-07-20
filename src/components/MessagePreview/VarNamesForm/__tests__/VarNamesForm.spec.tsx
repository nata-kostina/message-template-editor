import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { VarNamesForm } from "../VarNamesForm";

describe("Form with variable names inputs", () => {
    it("should render VarNamesFrom component", () => {
        const mockValues = { firstname: null };
        const mockOnChange = jest.fn(() => {});
        const { getByRole } = render(<VarNamesForm values={mockValues} onChange={mockOnChange} />);
        const form = getByRole("form");
        expect(form).toBeInTheDocument();
    });

    it("should render all input fields according to input values", () => {
        const mockValues = { firstname: null, lastname: null };
        const mockOnChange = jest.fn(() => {});
        const { getByPlaceholderText } = render(<VarNamesForm values={mockValues} onChange={mockOnChange} />);
        const firstnameInput = getByPlaceholderText(/firstname/i);
        const lastnameInput = getByPlaceholderText(/lastname/i);
        expect(firstnameInput).toBeInTheDocument();
        expect(lastnameInput).toBeInTheDocument();
    });

    it("should call onChange handler", () => {
        const mockValues = { firstname: null, lastname: null };
        const mockOnChange = jest.fn(() => {});
        const { getByPlaceholderText } = render(<VarNamesForm values={mockValues} onChange={mockOnChange} />);
        const firstnameInput = getByPlaceholderText(/firstname/i);
        fireEvent.change(firstnameInput, { target: { value: "John" } });
        expect(mockOnChange).toBeCalled();
    });
});
