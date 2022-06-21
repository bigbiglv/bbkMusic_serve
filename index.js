
const express = require('express')
const app = express()
const port = 5000
//处理post请求body参数
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//引入登录模块
const login = require('./modules/user/login')
app.use(login)

app.get('/', (req, res) => {
  // req request  请求对象    主要用来获取用户传递给服务器的数据
  // res response 相应对象    主要用来向用户发送数据
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
