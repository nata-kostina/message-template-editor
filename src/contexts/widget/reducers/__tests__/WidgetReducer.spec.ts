import {
    Actions, AddConditionAction, AddVarNameAction,
    DeleteConditionAction, InitRootAction, SetActiveTextareaAction, SetConditionsAction, SetContentAction, SetTemplateAction, WidgetState,
} from "../../../../types/context";
import { IActiveTextarea, IConditionNode } from "../../../../types/widget";
import { rootReducer } from "../root.reducer";

const initialState: WidgetState = {
    template: {},
    conditions: {},
    activeTextarea: {
        nodeId: null,
        location: 0,
    },
};

describe("Widget Context", () => {
    it("should add new condition", () => {
        const stateWithActiveTextarea: WidgetState = {
            conditions: {
                "node-1": {
                    id: "node-1",
                    parentId: null,
                    startContent: "Some content",
                    condition: null,
                },
            },
            activeTextarea: {
                nodeId: "node-1",
                location: 5,
            },
            template: {},
        };
        const action: AddConditionAction = {
            type: Actions.addCondition,
        };
        const state = rootReducer(stateWithActiveTextarea, action);
        const conditionsNum = Object.keys(state.conditions).length;
        expect(conditionsNum).toBe(5); // source node, if-node, then-node, else-node, end-node

        expect(state.activeTextarea.nodeId).toBe(state.conditions["node-1"].condition?.ifClauseId);
        expect(state.activeTextarea.location).toBe(0);
    });

    it("should add var name to the content", () => {
        const stateWithOneNode: WidgetState = {
            conditions: {
                "node-1": {
                    id: "node-1",
                    parentId: null,
                    startContent: "Hello, !",
                    condition: null,
                },
            },
            activeTextarea: {
                nodeId: "node-1",
                location: 7,
            },
            template: {},
        };
        const action: AddVarNameAction = { type: Actions.addVarName, payload: "firstname" };
        const state = rootReducer(stateWithOneNode, action);

        const { startContent } = state.conditions["node-1"];
        expect(startContent).toBe("Hello, {firstname}!");

        expect(state.activeTextarea.nodeId).toBe("node-1");
        expect(state.activeTextarea.location).toBe(18);
    });

    it("should delete condition", () => {
        const stateWithCondition: WidgetState = {
            conditions: {
                "start-node": {
                    id: "start-node",
                    parentId: null,
                    startContent: "Hi, {firstname}! ",
                    condition: {
                        ifClauseId: "if-node",
                        thenClauseId: "then-node",
                        elseClauseId: "else-node",
                        endContentId: "end-node",
                    },
                },
                "if-node": {
                    id: "if-node",
                    parentId: "start-node",
                    startContent: "{company}",
                    condition: null,
                },
                "then-node": {
                    id: "then-node",
                    parentId: "start-node",
                    startContent: "I see you work at {company}.",
                    condition: null,
                },
                "else-node": {
                    id: "else-node",
                    parentId: "start-node",
                    startContent: "Where do you work?",
                    condition: null,
                },
                "end-node": {
                    id: "end-node",
                    parentId: "start-node",
                    startContent: "\nRegards",
                    condition: null,
                },
            },
            activeTextarea: {
                nodeId: "if-node",
                location: 0,
            },
            template: {},
        };

        const action: DeleteConditionAction = { type: Actions.deleteCondition, payload: "start-node" };
        const state = rootReducer(stateWithCondition, action);

        expect(Object.keys(state.conditions).length).toBe(1);
        expect(state.activeTextarea.nodeId).toBe("start-node");

        const joinedText = "Hi, {firstname}! \nRegards";
        expect(state.activeTextarea.location).toBe(joinedText.length);
        expect(state.conditions["start-node"].startContent).toBe(joinedText);
    });

    it("should initialize root condition", () => {
        const rootNode: IConditionNode = {
            id: "root-node",
            parentId: null,
            startContent: "Hello!",
            condition: null,
        };
        const action: InitRootAction = { type: Actions.initRootCondition, payload: rootNode };
        const state = rootReducer(initialState, action);

        expect(Object.keys(state.conditions).length).toBe(1);
        expect(state.conditions["root-node"]).toBeDefined();
        expect(state.activeTextarea.nodeId).toBe("root-node");
        expect(state.activeTextarea.location).toBe(rootNode.startContent.length);
    });

    it("should set active textarea", () => {
        const stateWithOneNode: WidgetState = {
            conditions: {
                "node-1": {
                    id: "node-1",
                    parentId: null,
                    startContent: "Hello, {firstname}!",
                    condition: null,
                },
            },
            activeTextarea: {
                nodeId: "node-1",
                location: 7,
            },
            template: {},
        };
        const activeTextarea: IActiveTextarea = {
            nodeId: "node-1",
            location: 10,
        };
        const action: SetActiveTextareaAction = {
            type: Actions.setActiveTextarea,
            payload: activeTextarea,
        };

        const state = rootReducer(stateWithOneNode, action);
        expect(state.activeTextarea.nodeId).toBe("node-1");
        expect(state.activeTextarea.location).toBe(10);
    });

    it("should set conditions", () => {
        const conditions: Record<string, IConditionNode> = {
            "start-node": {
                id: "start-node",
                parentId: null,
                startContent: "Hi, {firstname}! ",
                condition: {
                    ifClauseId: "if-node",
                    thenClauseId: "then-node",
                    elseClauseId: "else-node",
                    endContentId: "end-node",
                },
            },
            "if-node": {
                id: "if-node",
                parentId: "start-node",
                startContent: "{company}",
                condition: null,
            },
            "then-node": {
                id: "then-node",
                parentId: "start-node",
                startContent: "I see you work at {company}.",
                condition: null,
            },
            "else-node": {
                id: "else-node",
                parentId: "start-node",
                startContent: "Where do you work?",
                condition: null,
            },
            "end-node": {
                id: "end-node",
                parentId: "start-node",
                startContent: "\nRegards",
                condition: null,
            },
        };

        const action: SetConditionsAction = { type: Actions.setConditions, payload: conditions };
        const state = rootReducer(initialState, action);

        expect(Object.keys(state.conditions).length).toBe(5);
        expect(state.conditions).toStrictEqual(conditions);
    });

    it("should set content", () => {
        const stateWithOneNode: WidgetState = {
            conditions: {
                "node-1": {
                    id: "node-1",
                    parentId: null,
                    startContent: "",
                    condition: null,
                },
            },
            activeTextarea: {
                nodeId: "node-1",
                location: 7,
            },
            template: {},
        };
        const content = "Hello, {firstname}!";
        const action: SetContentAction = {
            type: Actions.setContent,
            payload: { nodeId: "node-1", content },
        };
        const state = rootReducer(stateWithOneNode, action);

        expect(state.conditions["node-1"].startContent).toBe(content);
    });

    it("should set template", () => {
        const template: Record<string, IConditionNode> = {
            "start-node": {
                id: "start-node",
                parentId: null,
                startContent: "Hi, {firstname}! ",
                condition: {
                    ifClauseId: "if-node",
                    thenClauseId: "then-node",
                    elseClauseId: "else-node",
                    endContentId: "end-node",
                },
            },
            "if-node": {
                id: "if-node",
                parentId: "start-node",
                startContent: "{company}",
                condition: null,
            },
            "then-node": {
                id: "then-node",
                parentId: "start-node",
                startContent: "I see you work at {company}.",
                condition: null,
            },
            "else-node": {
                id: "else-node",
                parentId: "start-node",
                startContent: "Where do you work?",
                condition: null,
            },
            "end-node": {
                id: "end-node",
                parentId: "start-node",
                startContent: "\nRegards",
                condition: null,
            },
        };

        const action: SetTemplateAction = { type: Actions.setTemplate, payload: template };
        const state = rootReducer(initialState, action);

        expect(Object.keys(state.template).length).toBe(5);
        expect(state.template).toStrictEqual(template);
    });
});
