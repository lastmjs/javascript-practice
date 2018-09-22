export const conceptItems = {
    'primitive-data-types-concept-item': {
        questions: {
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
        numUserCompletedQuestions: 0
    },
    'objects-concept-item': {
        questions: {
            1: {
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
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'arrays-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create an array named numbers with five elements, each element being of type number.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                const numbers = [1, 2, 3, 4, 5];
                                // or
                                const numbers = new Array(1, 2, 3, 4, 5);
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'answer = numbers.length === 5 && typeof numbers[0] === \\\'number\\\' && typeof numbers[1] === \\\'number\\\' && typeof numbers[2] === \\\'number\\\' && typeof numbers[3] === \\\'number\\\' && typeof numbers[4] === \\\'number\\\'');
                    }
                    else {
                        answer = false;
                    }
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'async/await-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create an asynchronous function called wait.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                async function wait() {}
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = typeof wait().then === 'function';
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'callbacks-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a function named executeCallback that takes a callback function as a parameter and returns the result of that callback.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                function executeCallback(callback) {
                                    return callback();
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'answer = executeCallback(() => true) === true;');
                    }
                    else {
                        answer = false;
                    }
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'classes-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a class named Hans with two methods that each return true.</p>
                    <p>Name the methods pump and youUp.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                class Hans {
                                    pump() {
                                        return true;
                                    }

                                    youUp() {
                                        return true;
                                    }
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'const hans = new Hans(); answer = hans.pump() === true && hans.youUp() === true');
                    }
                    else {
                        answer = false;
                    }
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'closures-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a variable named closed and set it to true.</p>
                    <p>Create a function named closer that returns closed through a closure.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                const closed = true;

                                function closer() {
                                    return closed;
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'answer = closer() === true');
                    }
                    else {
                        answer = false;
                    }
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'control-flow-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a function named control that takes one parameter.</p>
                    <p>If that parameter is a number greater than or equal to 50, return the string 'You win!'.</p>
                    <p>If that parameter is a number less than 50, return the string 'You lose!'.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                function control(param) {
                                    if (param >= 50) {
                                        return 'You win!';
                                    }
                                    else {
                                        return 'You lose!';
                                    }
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'answer = control(50) === \\'You win!\\' && control(49) === \\'You lose!\\' && control(100) === \\'You win!\\' && control(3) === \\'You lose!\\'');
                    }
                    else {
                        answer = false;
                    }
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'functions-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a function named basicNumber that returns the number 10.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <p>There are many ways to create a function in JavaScript.</p>
                        <p>These are some of the most common ways:</p>
                        <p><br></p>
                        <code-sample>
                            <template>
                                function basicNumber() {
                                    return 10;
                                }

                                // or

                                const basicNumber = function() {
                                    return 10;
                                };

                                // or

                                const basicNumber = () => {
                                    return 10;
                                };
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'answer = basicNumber() === 10');
                    }
                    else {
                        answer = false;
                    }
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'generators-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Write a generator function called infiniteSum.</p>
                    <p>When the generator's next method is called, the result should have value 0, then 1, then 2 and repeat the pattern to infinity.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                function* infiniteSum() {
                                    for (let i=0; i < Infinity; i++) {
                                        yield i;
                                    }
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            const theGenerator = infiniteSum();
                            answer = theGenerator.next().value === 0 && theGenerator.next().value === 1 && theGenerator.next().value === 2 && theGenerator.next().value === 3;
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'modules-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>What is the correct value for the type attribute when importing a module through the script tag?</p>
                    <p><br></p>
                    <p>&lt;script type="[input1]" src="my-module.js" &gt;&lt;/script&gt;</p>
                    <p><br></p>
                    [solution1]
                        <p>&lt;script type="module" src="my-module.js" &gt;&lt;/script&gt;</p>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    answer = input1 === 'module';
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'operators-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a function named sum that takes two parameters.</p>
                    <p>Use the binary + operator to return the sum of these two parameters.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <p>+ is a binary operator, which means that it operates on two operands.</p>
                        <code-sample>
                            <template>
                                function sum(operand1, operand2) {
                                    return operand1 + operand2;
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = sum(100, 45) === 145;
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'promises-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a function named timeout that returns a promise that resolves just after 1000 milliseconds.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                function timeout() {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 1000);
                                    });
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    autoPostMessage = false;

                    if (code1) {
                        eval(code1);

                        let before999 = true;

                        setTimeout(() => {
                            before999 = false;
                        }, 999);

                        timeout().then(() => {
                            if (before999 === true) {
                                postMessage({
                                    answer: false
                                });
                            }
                            else {
                                postMessage({
                                    answer: true
                                });
                            }
                        });

                        setTimeout(() => {
                            postMessage({
                                answer: false
                            });
                        }, 1001);
                    }
                    else {
                        postMessage({
                            answer: false
                        });
                    }
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'proxies-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create an object named bank with one property named balance with a value of 100.</p>
                    <p>Create a proxy to that object, call it betterBank.</p>
                    <p>Whenever the balance property of betterBank is accessed, add 100 to it.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                const bank = {
                                    balance: 100
                                };

                                const betterBank = new Proxy(bank, {
                                    get: (target, prop, receiver) => {
                                        if (prop === 'balance') {
                                            return target[prop] + 100;
                                        }
                                        else {
                                            return target[prop];
                                        }
                                    }
                                });
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = betterBank.balance === 200;
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'scope-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>The ability for a JavaScript function to be used before being declared is called [input1].</p>
                    <p><br></p>
                    [solution1]
                        <p><a href="https://developer.mozilla.org/en-US/docs/Glossary/Hoisting">Hoisting</a></p>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    answer = input1.toLowerCase() === 'hoisting';
                `
            }
        },
        numUserCompletedQuestions: 0
    },
    'variables-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Use a constant declaration to declare and define an immutable variable named frozen.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <p>The value of the variable can be whatever you want, but you must use the const declaration.</p>
                        <code-sample>
                            <template>
                                const frozen = 'I am immutable';
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            try {
                                frozen = true;
                                answer = false;
                            }
                            catch(error) {
                                answer = true;
                            }
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `
            }
        },
        numUserCompletedQuestions: 0
    }
};
