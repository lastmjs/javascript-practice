window.process = {
    env: {
        NODE_ENV: window.location.hostname === 'javascriptpractice.com' ? 'production' : window.location.hostname.startsWith('deploy-preview-') ? 'staging' : 'development'
    },
    argv: []
};