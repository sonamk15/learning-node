const express = require("express");
const UserServices = require("../../services/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const userData = req.userCtx;
  const getUserData = await UserServices.getUser(userData);
  req.apiRes = getUserData;
  if (userLogin.success) {
    res.send(getUserData);
  } else {
    res.status(400).send(getUserData);
  }
});

module.exports = router;
