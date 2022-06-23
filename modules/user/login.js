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
      let result = JSON.parse(dataStr).user[0]
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