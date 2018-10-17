window.process = {
    env: {
        NODE_ENV: window.location.hostname === 'javascriptpractice.com' ? 'production' : window.location.hostname.includes('.netlify.com') ? 'staging' : 'development'
    },
    argv: []
};