const express = require('express');

const router = express.Router()

router.get('/', (req, res)=>{
    res.send({
        name:"sonam",
        lastName:"kumawat",
        age:24
    })
})

module.exports = router