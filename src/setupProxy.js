const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://topology.le5le.com", 
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api/"
      }
    })
  )
}