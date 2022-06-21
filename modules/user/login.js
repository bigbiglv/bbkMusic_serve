const router = require('express').Router();
router.post('/user/login',(req, res)=>{
  console.log('req',req)
  res.send({data:req.body})
})
module.exports = router;