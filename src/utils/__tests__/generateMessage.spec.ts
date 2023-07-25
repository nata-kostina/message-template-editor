import { IConditionNode } from "../../types/widget";
import { generateMessage } from "../generateMessage";

describe("Generate message", () => {
    it("should return empty message when the template is empty", () => {
        const template = {};
        const values = {};
        const message = generateMessage(values, template);
        expect(message).toBe("");
    });

    it("should replace all variable names with values", () => {
        const template: Record<string, IConditionNode> = {
            "start-node": {
                id: "start-node",
                parentId: null,
                startContent:
          "Hi, {firstname}! I see you work at {company} as a {position}.",
                condition: null,
            },
        };
        const values: Record<string, string | null> = {
            firstname: "John",
            company: "Google",
            position: "Software Developer",
        };
        const expectedMessage =
      "Hi, John! I see you work at Google as a Software Developer.";
        const message = generateMessage(values, template);
        expect(message).toBe(expectedMessage);
    });

    it("should replace all variable names with empty string if there is no value for such name", () => {
        const template: Record<string, IConditionNode> = {
            "start-node": {
                id: "start-node",
                parentId: null,
                startContent:
          "Hi, {firstname}! I see you work at {company} as a {position}.",
                condition: null,
            },
        };
        const values: Record<string, string | null> = {
            firstname: null,
            company: "Google",
            position: null,
        };
        const expectedMessage = "Hi, ! I see you work at Google as a .";
        const message = generateMessage(values, template);
        expect(message).toBe(expectedMessage);
    });

    it("should keep the text in curly braces if there is no such variable name", () => {
        const template: Record<string, IConditionNode> = {
            "start-node": {
                id: "start-node",
                parentId: null,
                startContent:
          "Hi, {firstname}! I see you work at {company} as a {position}.",
                condition: null,
            },
        };
        const values: Record<string, string | null> = {
            company: "Google",
        };
        const expectedMessage =
      "Hi, {firstname}! I see you work at Google as a {position}.";
        const message = generateMessage(values, template);
        expect(message).toBe(expectedMessage);
    });

    it("should add message from THEN-block if IF-block is not null", () => {
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
        const values: Record<string, string | null> = {
            firstname: "John",
            company: "Google",
        };
        const expectedMessage = "Hi, John! I see you work at Google.\nRegards";
        const message = generateMessage(values, template);
        expect(message).toBe(expectedMessage);
    });

    it("should add message from ELSE-block if the IF-block is null", () => {
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
        const values: Record<string, string | null> = {
            firstname: "John",
            company: null,
        };
        const expectedMessage = "Hi, John! Where do you work?\nRegards";
        const message = generateMessage(values, template);
        expect(message).toBe(expectedMessage);
    });

    it("should estimate IF-block as not null if it contains other text besides var names", () => {
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
                startContent: "{company} in London",
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
        const values: Record<string, string | null> = {
            firstname: "John",
            company: null,
        };
        const expectedMessage = "Hi, John! I see you work at .\nRegards";
        const message = generateMessage(values, template);
        expect(message).toBe(expectedMessage);
    });

    it("should not estimate AND, &&, OR, || as logical operators in IF-block", () => {
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
                startContent: "",
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
        const values: Record<string, string | null> = {
            firstname: "John",
            company: null,
            position: null,
        };
        // Check AND operator
        template["if-node"].startContent = "{company} AND {position}";
        const andExpectedMessage = "Hi, John! I see you work at .\nRegards";
        const andMessage = generateMessage(values, template);
        expect(andMessage).toBe(andExpectedMessage);

        // Check && operator
        template["if-node"].startContent = "{company} && {position}";
        const amperExpectedMessage = "Hi, John! I see you work at .\nRegards";
        const amperMessage = generateMessage(values, template);
        expect(amperMessage).toBe(amperExpectedMessage);

        // Check OR operator
        template["if-node"].startContent = "{company} OR {position}";
        const orExpectedMessage = "Hi, John! I see you work at .\nRegards";
        const orMessage = generateMessage(values, template);
        expect(orMessage).toBe(orExpectedMessage);

        // Check || operator
        template["if-node"].startContent = "{company} || {position}";
        const doubleOrExpectedMessage = "Hi, John! I see you work at .\nRegards";
        const doubleOrMessage = generateMessage(values, template);
        expect(doubleOrMessage).toBe(doubleOrExpectedMessage);
    });

    it("should not allow arithmetic operators in IF-block", () => {
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
                startContent: "",
                condition: null,
            },
            "then-node": {
                id: "then-node",
                parentId: "start-node",
                startContent: "You have such a large network!",
                condition: null,
            },
            "else-node": {
                id: "else-node",
                parentId: "start-node",
                startContent: "I would recommend you to expand your network.",
                condition: null,
            },
            "end-node": {
                id: "end-node",
                parentId: "start-node",
                startContent: "\nRegards",
                condition: null,
            },
        };
        const values: Record<string, string | null> = {
            firstname: "John",
            followers: "",
        };
        // Check > operator
        template["if-node"].startContent = "{followers} > 300";

        values.followers = "500";
        const message1 = generateMessage(values, template);

        values.followers = "100";
        const message2 = generateMessage(values, template);

        expect(message1).toBe(message2);

        // Check = operator
        template["if-node"].startContent = "{followers} = 300";

        values.followers = "300";
        const message3 = generateMessage(values, template);

        values.followers = "100";
        const message4 = generateMessage(values, template);

        expect(message3).toBe(message4);
    });

    it("should handle nested conditions", () => {
        const template: Record<string, IConditionNode> = {
            "start-node": {
                id: "start-node",
                parentId: null,
                startContent: "Hi, {firstname}!",
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
                startContent: "\nI know you work at {company}",
                condition: {
                    ifClauseId: "node-1",
                    thenClauseId: "node-2",
                    elseClauseId: "node-3",
                    endContentId: "node-4",
                },
            },
            "else-node": {
                id: "else-node",
                parentId: "start-node",
                startContent: "\nWhere do you work at the moment?",
                condition: {
                    ifClauseId: "node-5",
                    thenClauseId: "node-6",
                    elseClauseId: "node-7",
                    endContentId: "node-8",
                },
            },
            "end-node": {
                id: "end-node",
                parentId: "start-node",
                startContent: "\nRegards",
                condition: null,
            },
            // IF-node of nested condition in THEN-block
            "node-1": {
                id: "node-1",
                parentId: "then-node",
                startContent: "{position}",
                condition: null,
            },
            // THEN-node of nested condition in THEN-block
            "node-2": {
                id: "node-2",
                parentId: "then-node",
                startContent: " as {position}",
                condition: null,
            },
            // ELSE-node of nested condition in THEN-block
            "node-3": {
                id: "node-2",
                parentId: "then-node",
                startContent: ", but what is your role?",
                condition: null,
            },
            // END-node of nested condition in THEN-block
            "node-4": {
                id: "node-2",
                parentId: "then-node",
                startContent: " :)",
                condition: null,
            },
            // IF-node of nested condition in ELSE-block
            "node-5": {
                id: "node-5",
                parentId: "else-node",
                startContent: "{university}",
                condition: null,
            },
            // THEN-node of nested condition in ELSE-block
            "node-6": {
                id: "node-6",
                parentId: "else-node",
                startContent:
          "\nCould you please share the experience of studying at {university}?",
                condition: null,
            },
            // ELSE-node of nested condition in ELSE-block
            "node-7": {
                id: "node-7",
                parentId: "else-node",
                startContent: "\nWhere did you study?",
                condition: null,
            },
            // END-node of nested condition in ELSE-block
            "node-8": {
                id: "node-8",
                parentId: "else-node",
                startContent: "",
                condition: null,
            },
        };
        // Check if all values are not null
        const values1: Record<string, string | null> = {
            firstname: "John",
            company: "Google",
            position: "Software Developer",
            university: "The University of Oxford",
        };
        const expectedMessage1 =
      "Hi, John!\nI know you work at Google as Software Developer :)\nRegards";
        const message1 = generateMessage(values1, template);
        expect(message1).toBe(expectedMessage1);

        // Check if company is null
        const values2: Record<string, string | null> = {
            firstname: "John",
            company: null,
            position: "Software Developer",
            university: "The University of Oxford",
        };
        const expectedMessage2 =
      "Hi, John!" +
      "\nWhere do you work at the moment?" +
      "\nCould you please share the experience of studying at The University of Oxford?" +
      "\nRegards";
        const message2 = generateMessage(values2, template);
        expect(message2).toBe(expectedMessage2);

        // Check if university is null
        const values3: Record<string, string | null> = {
            firstname: "John",
            company: "Google",
            position: "Software Developer",
            university: null,
        };
        const expectedMessage3 =
      "Hi, John!" +
      "\nI know you work at Google as Software Developer " +
      ":)" +
      "\nRegards";
        const message3 = generateMessage(values3, template);
        expect(message3).toBe(expectedMessage3);

        // Check if position is null
        const values4: Record<string, string | null> = {
            firstname: "John",
            company: "Google",
            position: null,
            university: "The Oxford University",
        };
        const expectedMessage4 =
      "Hi, John!" +
      "\nI know you work at Google, but what is your role?" +
      " :)" +
      "\nRegards";
        const message4 = generateMessage(values4, template);
        expect(message4).toBe(expectedMessage4);

        // Check if company and position are null
        const values5: Record<string, string | null> = {
            firstname: "John",
            company: null,
            position: null,
            university: "The University of Oxford",
        };
        const expectedMessage5 =
      "Hi, John!" +
      "\nWhere do you work at the moment?" +
      "\nCould you please share the experience of studying at The University of Oxford?" +
      "\nRegards";
        const message5 = generateMessage(values5, template);
        expect(message5).toBe(expectedMessage5);

        // Check if company and university are null
        const values6: Record<string, string | null> = {
            firstname: "John",
            company: null,
            position: "Software Developer",
            university: null,
        };
        const expectedMessage6 =
      "Hi, John!" +
      "\nWhere do you work at the moment?" +
      "\nWhere did you study?" +
      "\nRegards";
        const message6 = generateMessage(values6, template);
        expect(message6).toBe(expectedMessage6);

        // Check if position and university are null
        const values7: Record<string, string | null> = {
            firstname: "John",
            company: "Google",
            position: null,
            university: null,
        };
        const expectedMessage7 =
        "Hi, John!" +
        "\nI know you work at Google, but what is your role?" +
        " :)" +
        "\nRegards";
        const message7 = generateMessage(values7, template);
        expect(message7).toBe(expectedMessage7);

        // Check if all values are null
        const values8: Record<string, string | null> = {
            firstname: "John",
            company: null,
            position: null,
            university: null,
        };
        const expectedMessage8 =
        "Hi, John!" +
        "\nWhere do you work at the moment?" +
        "\nWhere did you study?" +
        "\nRegards";
        const message8 = generateMessage(values8, template);
        expect(message8).toBe(expectedMessage8);
    });

    it("should allow variable values wrapped in curly brackets and equaled to variable name", () => {
        const template: Record<string, IConditionNode> = {
            "start-node": {
                id: "start-node",
                parentId: null,
                startContent:
          "Hi, {firstname}!",
                condition: null,
            },
        };
        const values: Record<string, string | null> = {
            firstname: "{lastname}",
            lastname: null,
        };
        const expectedMessage = "Hi, {lastname}!";
        const message = generateMessage(values, template);
        expect(message).toBe(expectedMessage);
    });

    it("should allow trailing curly brackets in the variable values", () => {
        const template: Record<string, IConditionNode> = {
            "start-node": {
                id: "start-node",
                parentId: null,
                startContent:
          "Hi, {firstname} {lastname}!",
                condition: null,
            },
        };
        const values: Record<string, string | null> = {
            firstname: "{Bob",
            lastname: "Smith}A",
        };
        const expectedMessage = "Hi, {Bob Smith}A!";
        const message = generateMessage(values, template);
        expect(message).toBe(expectedMessage);
    });

    it("should allow trailing curly brackets in the variable names", () => {
        const template: Record<string, IConditionNode> = {
            "start-node": {
                id: "start-node",
                parentId: null,
                startContent:
          "Hi, {first{name} {last}name}!",
                condition: null,
            },
        };
        const values: Record<string, string | null> = {
            "first{name": "Bob",
            "last}name": "Smith",
        };
        const expectedMessage = "Hi, Bob Smith!";
        const message = generateMessage(values, template);
        expect(message).toBe(expectedMessage);
    });

    it("should allow nested curly brackets in the variable values", () => {
        const template: Record<string, IConditionNode> = {
            "start-node": {
                id: "start-node",
                parentId: null,
                startContent:
          "Hi, {firstname} {lastname}!",
                condition: null,
            },
        };
        const values: Record<string, string | null> = {
            firstname: "{Bob{lastname}}",
            lastname: null,
        };
        const expectedMessage = "Hi, {Bob{lastname}} !";
        const message = generateMessage(values, template);
        expect(message).toBe(expectedMessage);
    });

    it("should allow nested curly brackets in the variable names", () => {
        const template: Record<string, IConditionNode> = {
            "start-node": {
                id: "start-node",
                parentId: null,
                startContent:
          "Hi, {{first{name}}} {{la{st}name}}!",
                condition: null,
            },
        };
        const values: Record<string, string | null> = {
            "{first{name}}": "Bob",
            "{la{st}name}": "Smith",
        };
        const expectedMessage = "Hi, Bob Smith!";
        const message = generateMessage(values, template);
        expect(message).toBe(expectedMessage);
    });
});
