var express = require('express');
var router = express.Router();
const {
    signup,
} = require('../business/signup')

router.post('/insertUser', async function(req, res, next){
    const request = req.body;
    const response = await signup(request)
    res.send(response);
});


module.exports = router;