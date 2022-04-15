const express = require('express');

const router = express.Router()

router.get('/', (req, res)=>{
    res.json({
        email:"sonam.k@mantralabsglobal.com",
        password:"qwertyuiop@1509"
    })
})

module.exports = router