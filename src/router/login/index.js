const express = require("express");
const LoginServices = require("../../services/login");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    email: "sonam.k@mantralabsglobal.com",
    password: "qwertyuiop@1509",
  });
});

router.post("/", async (req, res) => {
  const userLogin = await LoginServices.Login(req.body);
  req.apiRes = userLogin;
  if (userLogin.success) {
    res.send(userLogin);
  } else {
      res.status(400).send(userLogin)
  }
});

module.exports = router;
