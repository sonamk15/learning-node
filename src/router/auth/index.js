const express = require("express");
const AuthServices = require("../../services/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  const userLogin = await AuthServices.Login(req.body);
  req.apiRes = userLogin;
  if (userLogin.success) {
    res.status(userLogin.status).send(userLogin);
  } else {
    res.status(userLogin.status).send(userLogin);
  }
});

router.post("/sing-up", async (req, res) => {
  const userSingUp = await AuthServices.singUp(req.body);
  req.apiRes = userSingUp;
  if (userSingUp.success) {
    res.status(userSingUp.status).send(userSingUp);
  } else {
    res.status(userSingUp.status).send(userSingUp);
  }
});

module.exports = router;
