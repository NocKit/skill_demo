module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/': {
                ws: false,
                target: 'http://localhost:1080/',
                changeOrigin: true
            },
        }
    }
}
