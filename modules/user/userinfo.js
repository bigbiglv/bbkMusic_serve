const router = require('express').Router();
const fs = require('fs');
const path = require('path');
router.get('/user/userinfo',(req, res)=>{
  fs.readFile(path.join(__dirname, '../../json/user.json'),'utf8', (err, dataStr) => {
    if(err){
      res.send({
        result:{},
        code:500,
        msg:'读取文件失败'
      })
    }else{
      let result = JSON.parse(dataStr).user[0]
      res.send({
        result,
        code:200,
        msg:'success'
      }) 
    }
  })
})

module.exports = router;
