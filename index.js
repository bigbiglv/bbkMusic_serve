
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
//引入登录模块
const login = require('./modules/user/login')
const userinfo = require('./modules/user/userinfo')
app.use(login, userinfo)
app.get('/', (req, res) => {
  // req request  请求对象    主要用来获取用户传递给服务器的数据
  // res response 相应对象    主要用来向用户发送数据
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
