class UserServices {
  getUser = async (userData) => {
    try {
      return { success: true, userData };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };
}

module.exports = new UserServices();
