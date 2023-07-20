import React from "react";
import { render } from "@testing-library/react";
import { VarNamesList } from "../VarNamesList";

describe("Variable Names List", () => {
    it("should render VarNames component", () => {
        const arrVarNames = ["firstname", "lastname"];
        const mockAddVarName = jest.fn();
        const { getByRole } = render(
            <VarNamesList
                arrVarNames={arrVarNames}
                addVarName={mockAddVarName}
            />);
        const list = getByRole("list");
        expect(list).toBeInTheDocument();
    });

    it("should render var names in curly braces", () => {
        const arrVarNames = ["firstname"];
        const mockAddVarName = jest.fn();
        const { getByText } = render(
            <VarNamesList
                arrVarNames={arrVarNames}
                addVarName={mockAddVarName}
            />);
        const name = getByText(`{${arrVarNames[0]}}`);
        expect(name).toBeInTheDocument();
    });
});
