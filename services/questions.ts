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
    },
    10: {
        id: 10,
        assessML: `
            <p>Create an empty array named foo.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const foo = [];

                        // or

                        const foo = new Array();
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = Array.isArray(foo) && foo.length === 0;
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'arrays',
        order: 0
    },
    11: {
        id: 11,
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
        `,
        userCompleted: false,
        concept: 'arrays',
        order: 1
    },
    12: {
        id: 12,
        assessML: `
            <p>Create an array named twoD with one element.</p>
            <p>The one element should be an empty array.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const twoD = [[]];
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = twoD.length === 1 && twoD[0].length === 0;
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'arrays',
        order: 2
    },
    13: {
        id: 13,
        assessML: `
            <p>Create an array named fiveByFive.</p>
            <p>Each element in the array should be an array with five elements of any type.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const fiveByFive = [
                            [1, 2, 3, 4, 5], 
                            [1, 2, 3, 4, 5],
                            [1, 2, 3, 4, 5],
                            [1, 2, 3, 4, 5],
                            [1, 2, 3, 4, 5]
                        ];
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = 
                            fiveByFive.length === 5 &&
                            fiveByFive.reduce((result, outerItem) => {
                                if (outerItem.length !== 5) {
                                    return false;
                                }
                                
                                return result;
                            }, true)
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'arrays',
        order: 3
    },
    14: {
        id: 14,
        assessML: `
            <p>Create an array called threeByThreeByThree.</p>
            <p>Each element in the array should be an array with three elements.</p>
            <p>Each of those elements should be an array with three elements of any type.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const threeByThreeByThree = [
                            [
                                [1, 2, 3],
                                [1, 2, 3],
                                [1, 2, 3]
                            ],
                            [
                                [1, 2, 3],
                                [1, 2, 3],
                                [1, 2, 3]
                            ],
                            [
                                [1, 2, 3],
                                [1, 2, 3],
                                [1, 2, 3]
                            ]
                        ];
                    </template>
                </code-sample>
                <p></br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = 
                            threeByThreeByThree.length === 3 &&
                            threeByThreeByThree.reduce((result, level1) => {
                                return result && level1.reduce((result, level2) => {
                                    if (level2.length !== 3) {
                                        return false;
                                    }

                                    return result;
                                }, true);
                            }, true);
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'arrays',
        order: 4
    },
    15: {
        id: 15,
        assessML: `
            <p>You have an array that looks as follows:</p>
            <p>
                <code-sample>
                    <template>
                        const fruits = [
                            {
                                name: 'apple',
                                color: 'red'
                            },
                            {
                                name: 'orange',
                                color: 'orange'
                            },
                            {
                                name: 'banana',
                                color: 'yellow'
                            },
                            {
                                name: 'strawberry',
                                color: 'red'
                            },
                            {
                                name: 'blueberry',
                                color: 'blue'
                            },
                            {
                                name: 'lemon',
                                color: 'yellow'
                            }
                        ];
                    </template>
                </code-sample>
            </p>
            <p>Write a function named sortByColor that takes an array like fruits and returns an object.</p>
            <p>The keys of the object's properties are all the possible fruit colors in the array.</p>
            <p>The values of the object's properties are the number of fruits of that color in the array.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        function sortByColor(fruits) {
                            return fruits.reduce((result, outerFruit) => {
                                return {
                                    ...result,
                                    [outerFruit.color]: fruits.filter((innerFruit) => {
                                        return outerFruit.color === innerFruit.color;
                                    }).length
                                };
                            }, {});
                        }
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                const fruits = [
                    {
                        name: 'apple',
                        color: 'red'
                    },
                    {
                        name: 'orange',
                        color: 'orange'
                    },
                    {
                        name: 'banana',
                        color: 'yellow'
                    },
                    {
                        name: 'strawberry',
                        color: 'red'
                    },
                    {
                        name: 'blueberry',
                        color: 'blue'
                    },
                    {
                        name: 'lemon',
                        color: 'yellow'
                    }
                ];

                eval(code1 + \`
                    const sortedByColor = sortByColor(fruits);
                    answer = sortedByColor.red === 2 && sortedByColor.orange === 1 && sortedByColor.yellow === 2 && sortedByColor.blue === 1;
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'arrays',
        order: 5
    },
    16: {
        id: 16,
        assessML: `
            <p>
                <code-sample>
                    <template>
                        const jobs = [
                            {
                                id: 0,
                                timeInHours: 1
                            },
                            {
                                id: 1,
                                timeInHours: 5
                            },
                            {
                                id: 3,
                                timeInHours: 10
                            },
                            {
                                id: 4,
                                timeInHours: 3
                            },
                            {
                                id: 5,
                                timeInHours: 14
                            },
                            {
                                id: 6,
                                timeInHours: 18
                            },
                            {
                                id: 7,
                                timeInHours: 7
                            }
                        ];
                    </template>
                </code-sample>
            </p>
            <p>Your editor will have an array called jobs similar to the jobs array above.</p>
            <p>In a variable called shortJobs, store all of the jobs that took less than 10 hours.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const shortJobs = jobs.filter((job) => {
                            return job.timeInHours < 10;
                        });
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                const jobs = [
                    {
                        id: 0,
                        timeInHours: 11
                    },
                    {
                        id: 1,
                        timeInHours: 15
                    },
                    {
                        id: 3,
                        timeInHours: 1
                    },
                    {
                        id: 4,
                        timeInHours: 30
                    },
                    {
                        id: 5,
                        timeInHours: 4
                    },
                    {
                        id: 6,
                        timeInHours: 2
                    },
                    {
                        id: 7,
                        timeInHours: 7
                    }
                ];

                eval(code1 + \`
                    answer = 
                            shortJobs.filter((job) => {
                                return job.timeInHours < 10;
                            }).length === 4
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'arrays',
        order: 6
    },
    17: {
        id: 17,
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
        `,
        userCompleted: false,
        concept: 'async/await',
        order: 0
    },
    18: {
        id: 18,
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
        `,
        userCompleted: false,
        concept: 'callbacks',
        order: 0
    },
    19: {
        id: 19,
        assessML: `
            <p>Create an empty class named MyClass.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        class MyClass {}
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = MyClass.name === 'MyClass';
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'classes',
        order: 0
    },
    20: {
        id: 20,
        assessML: `
            <p>Create a class named MyClass with a constructor that sets the init property to true.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        class MyClass {
                            constructor() {
                                this.init = true;
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
                    answer = new MyClass().init === true;
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'classes',
        order: 1
    },
    21: {
        id: 21,
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
        `,
        userCompleted: false,
        concept: 'classes',
        order: 2
    },
    22: {
        id: 22,
        assessML: `
            <p>Create a class named Parent with a constructor that sets the init property to true.</p>
            <p>Create a class called Child that inherits from Parent.</p>
            <p>Ensure that Child properly inherits from Parent when a new instance of Child is created.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        class Parent {
                            constructor() {
                                this.init = true;
                            }
                        }

                        class Child extends Parent {}
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = new Child().init === true;
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'classes',
        order: 3
    },
    23: {
        id: 23,
        assessML: `
            <p>There is a class called Puppy that is available to your editor.</p>
            <p>Create an instance of Puppy and store it in a variable called puppy.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const puppy = new Puppy();
                    </template>
                </code-sample>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                class Puppy {
                    constructor() {
                        this.one = 2562362;
                        this.two = 1215155;
                    }
                }

                eval(code1 + \`
                    answer = puppy.one === 2562362 && puppy.two === 1215155;
                \`);
            }
            else {
                answer = false;
            } 
        `,
        userCompleted: false,
        concept: 'classes',
        order: 4
    },
    24: {
        id: 24,
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
        `,
        userCompleted: false,
        concept: 'closures',
        order: 0
    },
    25: {
        id: 25,
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
        `,
        userCompleted: false,
        concept: 'control-flow',
        order: 0
    },
    26: {
        id: 26,
        assessML: `
            <p>Create an empty function named nothing.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        function nothing() {}
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = nothing() === undefined;
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'functions',
        order: 0
    },
    27: {
        id: 27,
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
        `,
        userCompleted: false,
        concept: 'functions',
        order: 1
    },
    28: {
        id: 28,
        assessML: `
            <p>Create a function named hello that returns the string 'mundo!'.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        function hello() {
                            return 'mundo!';
                        }

                        // or

                        const hello = function() {
                            return 'mundo!';
                        }

                        // or

                        const hello = () => {
                            return 'mundo!';
                        };
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = hello() === 'mundo!';
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'functions',
        order: 2
    },
    29: {
        id: 29,
        assessML: `
            <p>Create a function named higherOrder that returns an empty function</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        function higherOrder() {
                            return function() {};
                        }

                        // or

                        function higherOrder() {
                            return () => {};
                        }

                        // or

                        const higherOrder = () => {
                            return function() {};
                        };

                        // or

                        const higherOrder = () => {
                            return () => {};
                        };
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                eval(code1 + \`
                    answer = higherOrder()() === undefined;
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'functions',
        order: 3
    },
    30: {
        id: 30,
        assessML: `
            <p>There is a function available to your editor called countCats.</p>
            <p>Invoke the function countCats and store it in a variable called numCats.</p>
            <p><br></p>
            <p>[code1]</p>
            [solution1]
                <code-sample>
                    <template>
                        const numCats = countCats();
                    </template>
                </code-sample>
                <p><br></p>
            [solution1]
        `,
        javaScript: `
            if (code1) {
                function countCats() {
                    return 14535;
                }

                eval(code1 + \`
                    answer = numCats === countCats();
                \`);
            }
            else {
                answer = false;
            }
        `,
        userCompleted: false,
        concept: 'functions',
        order: 4
    },
    31: {
        id: 31,
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
        `,
        userCompleted: false,
        concept: 'generators',
        order: 0
    },
    32: {
        id: 32,
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
        `,
        userCompleted: false,
        concept: 'modules',
        order: 0
    },
    33: {
        id: 33,
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
        `,
        userCompleted: false,
        concept: 'operators',
        order: 0
    },
    34: {
        id: 34,
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
        `,
        userCompleted: false,
        concept: 'promises',
        order: 0
    },
    35: {
        id: 35,
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
        `,
        userCompleted: false,
        concept: 'proxies',
        order: 0
    },
    36: {
        id: 36,
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
        `,
        userCompleted: false,
        concept: 'scope',
        order: 0
    },
    37: {
        id: 37,
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
        `,
        userCompleted: false,
        concept: 'variables',
        order: 0
    }
};