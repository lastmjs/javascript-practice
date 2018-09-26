export const questions = {
    0: {
        id: 0,
        assessML: `
            <p>Create a variable named foo that has the boolean value true.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const foo = true;
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = foo === true;
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'primitive-data-types',
        order: 0
    },
    1: {
        id: 1,
        assessML: `
            <p>Create a variable named foo that has the boolean value false.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const foo = false;
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = foo === false;
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'primitive-data-types',
        order: 1
    },
    2: {
        id: 2,
        assessML: `
            <p>What is the value of foo?</p>
            <p>
                <code-sample>
                    <template>
                        const foo = !!0;
                    </template>
                </code-sample>
            </p>
            <p><br></p>
            <p>
                [radio1]true[radio1]<br><br>[radio2]false[radio2]
            </p>
            [solution1]
                <p>false</p>
            [solution1]
        `,
        javaScript: `
            answer = radio1 === false && radio2 === true;
        `,
        userCompleted: false,
        concept: 'primitive-data-types',
        order: 2
    },
    3: {
        id: 3,
        assessML: `
            <p>What is the value of foo?</p>
            <p>
                <code-sample>
                    <template>
                        const foo = !!1;
                    </template>
                </code-sample>
            </p>
            <p><br></p>
            <p>
                [radio1]true[radio1]<br><br>[radio2]false[radio2]
            </p>
            [solution1]
                <p>true</p>
            [solution1]
        `,
        javaScript: `
            answer = radio1 === true && radio2 === false;
        `,
        userCompleted: false,
        concept: 'primitive-data-types',
        order: 3
    },
    4: {
        id: 4,
        assessML: `
            <p>What are the six primitive data types in JavaScript?</p>
            <p><br></p>
            <p>[input1]</p>
            <p>[input2]</p>
            <p>[input3]</p>
            <p>[input4]</p>
            <p>[input5]</p>
            <p>[input6]</p>
            [solution1]
                <p>The primitive data types in JavaScript are: boolean, null, undefined, number, string, and symbol.</p>
                <p>More information can be found <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types" target="_blank">here</a>.</p>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            const solutionString = input1.toLowerCase() + input2.toLowerCase() + input3.toLowerCase() + input4.toLowerCase() + input5.toLowerCase() + input6.toLowerCase();
            answer =
                solutionString.includes('boolean') &&
                solutionString.includes('null') &&
                solutionString.includes('undefined') &&
                solutionString.includes('number') &&
                solutionString.includes('string') &&
                solutionString.includes('symbol');
        `,
        userCompleted: false,
        concept: 'primitive-data-types',
        order: 4
    },
    5: {
        id: 5,
        assessML: `
            <p>Create an empty object and store it in the variable foo.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const foo = {};
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = JSON.stringify(foo) === '{}';
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'objects',
        order: 0
    },
    6: {
        id: 6,
        assessML: `
            <p>Create an object named foo with one property.</p>
            <p>The property's key should be hello and its value the string 'there'.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const foo = {
                            hello: 'there'
                        };
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = foo.hello === 'there';
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'objects',
        order: 1
    },
    7: {
        id: 7,
        assessML: `
            <p>Create an object named monkey with three properties.</p>
            <p>One property should have a key called type with its value the string chimp.</p>
            <p>One property should have a key called numBananas with its value the number 50.</p>
            <p>One property should have a key called ageInYears with its value the number 4.</p>
            <p><br></p>
            <p>[code1]</p>
            <p><br></p>
            [solution1]
                <p>The simplest way to create a <a href="https://www.quora.com/What-is-a-plainObject-in-JavaScript" target="_blank">plain data object</a> in JavaScript is to use the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals" target="_blank">object literal</a> syntax.</p>
                <p>Plain data objects only have properties with primitive key value pairs, meaning the keys and values are primitive data types.</p>
                <p>The following is the best practice solution to this problem:</p>
                <p>
                    <code-sample>
                        <template>
                            const monkey = {
                                type: 'chimp',
                                numBananas: 50,
                                ageInYears: 4
                            };
                        </template>
                    </code-sample>
                </p>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + 'answer = monkey.type === \\'chimp\\' && monkey.numBananas === 50 && monkey.ageInYears === 4');
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'objects',
        order: 2
    },
    8: {
        id: 8,
        assessML: `
            <p>Create an object named foo with one property.</p>
            <p>The property's key should be child and its value an empty object.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const foo = {
                            child: {}
                        };
                    </template>
                </code-sample>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = JSON.stringify(foo.child) === '{}';
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'objects',
        order: 3
    },
    9: {
        id: 9,
        assessML: `
            <p>Create an object named foo with one property.</p>
            <p>The property's key should be child and its value an object with one property.</p>
            <p>That property's key should be grandchild and its value an empty object.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const foo = {
                            child: {}
                        };
                    </template>
                </code-sample>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = JSON.stringify(foo.child.grandchild) === '{}';
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'objects',
        order: 4
    }
};