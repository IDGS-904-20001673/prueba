const authenticate = require('../business/login')
var express = require('express');
var router = express.Router();


router.post('/authenticate', async function (req, res) {
    const request = req.body;
    const response = await authenticate(request);
    res.send(response);
});


module.exports = router;