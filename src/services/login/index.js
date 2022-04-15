const { createJwtToken } = require('../../middleware/auth');

class  LoginServices{
    Login = async(payload) => {
        const token = await createJwtToken(payload)
        return { sucess:true, token }  
    }
}

module.exports = new LoginServices()