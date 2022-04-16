const { createJwtToken } = require("../../middleware/auth");

class LoginServices {
  Login = async (payload) => {
    try {
      const token = await createJwtToken(payload);
      return { sucess: true, token };
    } catch (e) {
      return { sucess: false, message: e.message };
    }
  };
}

module.exports = new LoginServices();
