const express = require("express");
const router = express.Router();
const ConnectController = require("../controller/ConnectController");
const { jwtKey } = require("../helper/envVar");
const jwt = require("jsonwebtoken");
const { authVerification } = require('../helper/authVerification');


router.use(authVerification);

// connects page routers
router.get("/jwt/verify", async (req, res, next) => {
  res.json({message: "Jwt token verifyed", valid: true})
});
router.get("/connects/allUser", ConnectController.AllUser);

module.exports = router;
