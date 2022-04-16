const { createJwtToken } = require("../../middleware/auth");
const { User } = require("../../model/user");

class AuthServices {
  Login = async (payload) => {
    try {
      const token = await createJwtToken(payload);
      return { success: true, token };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  singUp = async (userData) => {
    let data = {};
    try {
      data = await User.create(userData);
      return { success: true, data };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };
}

module.exports = new AuthServices();
