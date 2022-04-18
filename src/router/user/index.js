const express = require("express");
const UserServices = require("../../services/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const userData = req.userCtx;
  const getUserData = await UserServices.getUser(userData);
  req.apiRes = getUserData;
  if (getUserData.success) {
    res.status(getUserData.status).send(getUserData);
  } else {
    res.status(getUserData.status).send(getUserData);
  }
});

module.exports = router;
