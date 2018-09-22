export const questions = {
    'primitive-data-types-concept-item': {
        1: {
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
    },
    'objects-concept-item': {
        1: {
            assessML: `it works`,
            javaScript: `answer = true`
        }
    }
};
