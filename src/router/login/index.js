const express = require('express');
const LoginServices = require('../../services/login')

const router = express.Router()

router.get('/', (req, res)=>{
    res.json({
        email:"sonam.k@mantralabsglobal.com",
        password:"qwertyuiop@1509"
    })
})

router.post('/', async(req, res)=>{
    console.log(req.body)
    const userLogin = await LoginServices.Login(req.body)
    res.send(userLogin)
})


module.exports = router