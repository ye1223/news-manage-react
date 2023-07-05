const {createProxyMiddleware } = require('http-proxy-middleware')
/* setTimeout(()=>{
  console.log(process.env.NODE_ENV)
}, 3000) */

module.exports = function(app){
  app.use(
        '/adminapi',
        createProxyMiddleware({
          target: 'http://localhost:3000' ,
          changeOrigin: true,
          // pathRewrite: 
        })
      )
}