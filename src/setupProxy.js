const { createProxyMiddleware } = require('http-proxy-middleware')
// import process from 'process'

module.exports = function (app) {
  app.use(
    '/adminapi',
    createProxyMiddleware({
      target: 'http://localhost:3000' ,
      // target: process.env.REACT_APP_SERVER_URL,
      changeOrigin: true,
      // pathRewrite: 
    })
  )
}