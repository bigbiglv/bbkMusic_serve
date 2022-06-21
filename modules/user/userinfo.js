const router = require('express').Router();

router.get('/user/userinfo',(req, res)=>{
  res.send({
    result:{
      username:'admin',
      password:'123456'
    },
    code:200,
    msg:'success'
  })
})

module.exports = router;
