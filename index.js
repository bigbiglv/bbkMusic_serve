
const express = require('express')
const path = require('path')
const app = express()
//端口
const port = 5000
//静态资源
app.use(express.static(path.join(__dirname, '/static')))
app.use('/static', express.static(path.join(__dirname, '/static')))
//处理post请求body参数
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//token验证
const {expressjwt} = require('express-jwt')
const secreKey = 'bigbigkingSecreKey'
app.use(expressjwt({secret: secreKey, algorithms:['HS256']}).unless({path:[/^\//]}))



//引入模块
const login = require('./modules/user/login')
const userinfo = require('./modules/user/userinfo')
const register = require('./modules/user/register')
app.use(login, userinfo, register)




app.get('/', (req, res) => {
  // req request  请求对象    主要用来获取用户传递给服务器的数据
  // res response 相应对象    主要用来向用户发送数据
  res.send('Hello World!')
})
app.get('/search', (req, res) => {
  // req request  请求对象    主要用来获取用户传递给服务器的数据
  // res response 相应对象    主要用来向用户发送数据
  res.send({result:'search', code:200})
})
app.get('/web/search', (req, res) => {
  // req request  请求对象    主要用来获取用户传递给服务器的数据
  // res response 相应对象    主要用来向用户发送数据
  res.send({ result: 'web/search', code: 200 })
})


//错误级别的中间件
app.use((err, req, res, next) => {
  //token验证失败
  if(err.name === 'UnauthorizedError') {
    return res.send({
      msg:err.message,
      code:401,      
    })
  }
  //其他错误
  res.send({
    msg:err,
    code:500
  })
})
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
