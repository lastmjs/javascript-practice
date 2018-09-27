window.process = {
    env: {
        NODE_ENV: window.location.hostname === 'javascriptpractice.com' ? 'production' : 'development'
    },
    argv: []
};