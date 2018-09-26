export const questions = {
    0: {
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
        concept: 'primitive-data-types'
    },
    1: {
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
        concept: 'primitive-data-types'
    },
    2: {
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
        concept: 'primitive-data-types'
    },
    3: {
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
        concept: 'primitive-data-types'
    },
    4: {
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
        concept: 'primitive-data-types'
    }
};