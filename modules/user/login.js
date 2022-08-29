const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const secreKey = 'bigbigkingSecreKey'
const expiresIn = `${60*60*24}s`

router.post('/user/login',(req, res)=>{
  let user = req.body
  //生成token 不把密码加密进去
  let token = jwt.sign({name:user.username},secreKey,{expiresIn})
  fs.readFile(path.join(__dirname, '../../json/user.json'),'utf8', (err, dataStr) => {
    if(err){
      res.send({
        result:{},
        code:500,
        msg:'读取文件失败'
      })
    }else{
      let data = JSON.parse(dataStr)
      // 判断用户是否存在
      let userInfo = data.user.filter(item => item.username === user.username)
      if(userInfo.length === 0) {
        return res.send({
          result:{},
          code:404,
          msg:'用户名不存在'
        })
      }
      let result = userInfo[0]
      //判断密码是否对应
      if(result.password !== user.password){
        return res.send({
          result:{},
          code:404,
          msg:'密码错误'
        })
      }
      result['token'] = token
      res.send({
        result,
        code:200,
        msg:'success'
      }) 
    }
  })
})
module.exports = router;