class UserServices {
  getUser = async (userData) => {
    try {
      return { success: true, data: userData, status: 200 };
    } catch (e) {
      return { success: false, message: e.message, status: 400 };
    }
  };
}

module.exports = new UserServices();
