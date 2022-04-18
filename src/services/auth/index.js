const bcrypt = require("bcrypt");
const { createJwtToken } = require("../../middleware/auth");
const { User } = require("../../model/user");

class AuthServices {
  Login = async (payload) => {
    try {
      const body = payload;
      const user = await User.findOne({ email: body.email });
      if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
          const userPayload = {
            id: user._id.toString(),
            email: user.email,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
          };
          const token = await createJwtToken(userPayload);
          return { success: true, token: token, status: 200 };
        } else {
          return { success: false, message: "Invalid Password", status: 400 };
        }
      } else {
        return { success: false, message: "User does not exist", status: 401 };
      }
    } catch (e) {
      return { success: false, message: e.message, status: 400 };
    }
  };

  singUp = async (userData) => {
    try {
      // creating a new mongoose doc from user data
      const user = new User(userData);
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      user.password = await bcrypt.hash(user.password, salt);
      return await user.save().then((doc) => {
          return { success: true, data: doc, status: 200 };
        }).catch((err) => {
          return { success: false, message: err.message, status: 400 };
        });
    } catch (e) {
      return { success: false, message: e.message, status: 400 };
    }
  };
}

module.exports = new AuthServices();
