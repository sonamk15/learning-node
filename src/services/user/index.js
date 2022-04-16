class UserServices {
  getUser = async (userData) => {
    try {
      return { sucess: true, userData };
    } catch (e) {
      return { sucess: false, message: e.message };
    }
  };
}

module.exports = new UserServices();
