const express = require("express");
const AuthServices = require("../../services/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  const userLogin = await AuthServices.Login(req.body);
  req.apiRes = userLogin;
  if (userLogin.success) {
    res.send(userLogin);
  } else {
    res.status(400).send(userLogin);
  }
});

router.post("/sing-up", async (req, res) => {
  const userSingUp = await AuthServices.singUp(req.body);
  req.apiRes = userSingUp;
  if (userSingUp.success) {
    res.send(userSingUp);
  } else {
    res.status(400).send(userSingUp);
  }
});

module.exports = router;
