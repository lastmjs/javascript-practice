export const GRAPHQL_HTTP_ENDPOINT = {
    production: 'https://us1.prisma.sh/jordan-last/javascript-practice/dev',
    staging: 'https://us1.prisma.sh/jordan-last/javascript-practice/dev',
    development: 'http://10.0.1.35:4466'
}[window.process.env.NODE_ENV];

export const highlightColor = `rgba(240, 219, 79, 1)`;
export const backgroundColor = `rgba(229, 229, 229, 1)`;
export const selectedColor = `rgba(200, 200, 200, 1)`;
export const zIndexLayerNegative1 = '-1';
export const zIndexLayer0 = '0';
export const zIndexLayer1 = '1';
export const zIndexLayer2 = '2';
export const zIndexLayer3 = '3';
export const zIndexLayer4 = '4';
export const zIndexLayer5 = '5';
export const zIndexLayer6 = '6';
export const zIndexLayer7 = '7';
export const zIndexLayer8 = '8';

export const menuItemProperties = `
    position: relative;
    flex-grow: 1;
    padding: 2em;
    cursor: pointer;
    transition: background-color .5s ease;
    font-weight: bold;
    font-size: calc(12px + 1vmin);
`;

export const authenticationInput = `
    .authentication-input {
        font-family: monospace;
        font-size: calc(20px + 1vmin);
        padding: calc(12px + 1vmin);
        border: none;
        box-shadow: 0px 0px 1px grey;
        background-color: ${selectedColor};
    }
`;

export const authenticationInputsContainer = `
    .authentication-inputs-container {
        display: grid;
        margin-top: 10vh;
    }
`;

export const authenticationInputRow = `
    .authentication-input-row {
        margin-bottom: 5vh;
        text-align: center;
    }
`;

export const authenticationSubmitButton = `
    .authentication-submit-button {
        font-size: calc(12px + 1vmin);
        font-family: monospace;
        cursor: pointer;
        background: none;
        padding: calc(12px + 1vmin);
        border: none;
        box-shadow: 0px 0px 5px grey;
    }
`;