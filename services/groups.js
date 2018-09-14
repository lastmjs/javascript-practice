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
        assessML: `[code1]`,
        javaScript: `answer = true;`
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
