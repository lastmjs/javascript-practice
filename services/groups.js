export const groups = [{
    id: 'basic-data-types',
    title: 'Basic data types',
    question: {
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
        `
    }
}, {
    id: 'objects',
    title: 'Objects',
    question: {
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
                    const monkey = {
                        type: 'chimp',
                        numBananas: 50,
                        ageInYears: 4
                    };
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
        `
    }
}, {
    id: 'functions',
    title: 'Functions',
    question: {
        assessML: `[code1]`,
        javaScript: `answer = true;`
    }
}, {
    id: 'arrays',
    title: 'Arrays',
    question: {
        assessML: `[code1]`,
        javaScript: `answer = true;`
    }
}, {
    id: 'classes',
    title: 'Classes',
    question: {
        assessML: `[code1]`,
        javaScript: `answer = true;`
    }
}];


// <jp-group title="Basic data types"></jp-group>
// <jp-group title="Objects"></jp-group>
// <jp-group title="Functions"></jp-group>
// <jp-group title="Arrays"></jp-group>
// <jp-group title="Classes"></jp-group>
// <jp-group title="Modules"></jp-group>
// <jp-group title="Operators"></jp-group>
// <jp-group title="Control flow"></jp-group>
// <jp-group title="Variables"></jp-group>
// <jp-group title="Promises"></jp-group>
// <jp-group title="async/await"></jp-group>
// <jp-group title="Generators"></jp-group>
// <jp-group title="Scope"></jp-group>
// <jp-group title="Closures"></jp-group>
// <jp-group title="Callbacks"></jp-group>
// <jp-group title="Proxy"></jp-group>
