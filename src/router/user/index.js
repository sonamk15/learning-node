const express = require('express');
const UserServices = require('../../services/user')
const router = express.Router()

router.get('/', async(req, res)=>{
    const userData =  req.userCtx
    const getUserData = await UserServices.getUser(userData)
    res.send(getUserData)
})

module.exports = router