export const GRAPHQL_HTTP_ENDPOINT = {
    production: 'https://us1.prisma.sh/jordan-last/javascript-practice/dev',
    staging: 'https://us1.prisma.sh/jordan-last/javascript-practice/dev',
    development: 'http://192.168.0.23:4466'
}[window.process.env.NODE_ENV];

export const highlightColor = `rgba(240, 219, 79, 1)`;
export const backgroundColor = `rgba(229, 229, 229, 1)`;
export const selectedColor = `rgba(200, 200, 200, 1)`;