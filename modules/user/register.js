
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
//注册路由
router.post('/user/register',(req, res)=>{
  let user = req.body
  if(!user.username || !user.password){
    res.send({
      result:{},
      code:500,
      msg:'用户名或密码不能为空'
    })
    return
  }
  //读取文件判断是否存在用户名
  fs.readFile(path.join(__dirname, '../../json/user.json'),'utf8', (err, dataStr) => {
    if(err){
      res.send({
        result:{},
        code:500,
        msg:'读取文件失败'
      })
    }else{
      let data = JSON.parse(dataStr)
      if(data.user.findIndex(item => item.name === user.username) === -1){
        user.name = user.username
        user.avatar = "/static/images/avatar/bbk.png"
        user.id = data.user.length + 1
        //可以注册 将当前信息加进user.json中
        data.user.push(user)
        fs.writeFile(path.join(__dirname, '../../json/user.json'),JSON.stringify(data),'utf8',function(err){
          if(err){
            res.send({
              result:{},
              code:500,
              msg:'服务器错误'
            })
          }else{
            res.send({
              result:{},
              code:200,
              msg:'注册成功'
            })
          }
        })
      }else{
        res.send({
          result:{},
          code:404,
          msg:'用户名已存在'
        }) 
      }
    }
  })
})

module.exports = router;
