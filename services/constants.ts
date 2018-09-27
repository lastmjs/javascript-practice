export const GRAPHQL_HTTP_ENDPOINT = {
    production: '',
    staging: 'https://us1.prisma.sh/jordan-last/javascript-practice/dev',
    development: 'http://localhost:4466'
}[window.process.env.NODE_ENV];