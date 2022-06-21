const router = require('express').Router();
const fs = require('fs');
const path = require('path');
router.post('/user/login',(req, res)=>{
  console.log('req',req)
  fs.readFile(path.join(__dirname, '../../json/user.json'),'utf8', (err, dataStr) => {
    if(err){
      res.send({
        data:{},
        code:500,
        msg:'读取文件失败'
      })
    }else{
      let data = JSON.parse(dataStr).user[0];
      res.send({
        data,
        code:200,
        msg:'success'
      }) 
    }
  })
})
module.exports = router;