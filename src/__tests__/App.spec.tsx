import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { App } from "../App";
import * as CustomUseVarNamesHook from "../hooks/useVarNames";
import * as CustomUseTemplateHook from "../hooks/useTemplate";
import { WidgetState } from "../types/context";
import { WidgetContext } from "../contexts/widget/widget.context";

describe("App", () => {
    it("should show loader when data are loading", () => {
        const { getByTestId } = render(<App />);
        const loader = getByTestId("loader");
        expect(loader).toBeInTheDocument();
    });

    it("should hide loader when data are loaded", () => {
        jest.spyOn(CustomUseVarNamesHook, "useVarNames").mockImplementation(() => {
            return { loading: false, data: ["firstname"], setArrVarNames: jest.fn() };
        });
        jest.spyOn(CustomUseTemplateHook, "useTemplate").mockImplementation(() => {
            return { loading: false, data: null, setTemplate: jest.fn() };
        });
        const { queryByTestId } = render(<App />);
        const loader = queryByTestId("loader");
        expect(loader).not.toBeInTheDocument();
    });

    it("should render button to open widget when data are loaded", () => {
        jest.spyOn(CustomUseVarNamesHook, "useVarNames").mockImplementation(() => {
            return { loading: false, data: ["firstname"], setArrVarNames: jest.fn() };
        });
        jest.spyOn(CustomUseTemplateHook, "useTemplate").mockImplementation(() => {
            return { loading: false, data: null, setTemplate: jest.fn() };
        });
        const { getByRole } = render(<App />);
        const button = getByRole("button", { name: /Message Editor/i });
        expect(button).toBeInTheDocument();
    });

    it("should render message editor when button is clicked and data are loaded", async () => {
        jest.spyOn(CustomUseVarNamesHook, "useVarNames").mockImplementation(() => {
            return { loading: false, data: ["firstname"], setArrVarNames: jest.fn() };
        });
        jest.spyOn(CustomUseTemplateHook, "useTemplate").mockImplementation(() => {
            return { loading: false, data: null, setTemplate: jest.fn() };
        });

        const mockWidgetContext: WidgetState = {
            conditions: {
                "node-1": {
                    id: "node-1",
                    parentId: null,
                    condition: null,
                    startContent: "Hello!",
                },
            },
            activeTextarea: {
                nodeId: "node-1",
                location: 0,
            },
            template: {},
        };

        const { getByRole, findByRole } = render(
            <WidgetContext.Provider value={mockWidgetContext}>
                <App />
            </WidgetContext.Provider>);
        const button = getByRole("button", { name: /Message Editor/i });
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        const editor = await findByRole("heading", { level: 2, name: "Message Template Editor" });
        expect(editor).toBeInTheDocument();
    });
});
