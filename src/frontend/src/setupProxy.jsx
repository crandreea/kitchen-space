
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://localhost:5122', // adresa serverului tău backend
            changeOrigin: true,
            secure: false, // setează pe true dacă backend-ul folosește HTTPS
            pathRewrite: {
                '^/api': '/api', // Păstrează /api în path-ul cererii
            },
            onProxyReq: function(proxyReq, req, res) {
                console.log('Proxy request:', req.method, req.path);
            },
            onProxyRes: function(proxyRes, req, res) {
                console.log('Proxy response:', proxyRes.statusCode);
            },
            onError: function(err, req, res) {
                console.error('Proxy error:', err);
                res.writeHead(500, {
                    'Content-Type': 'text/plain',
                });
                res.end('Proxy error: Cannot connect to the backend server. Please check if the server is running.');
            }
        })
    );
};