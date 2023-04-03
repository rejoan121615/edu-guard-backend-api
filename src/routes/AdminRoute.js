const express = require("express");
const router = express.Router();
const AccountController = require("../controller/AccountController");

// create account
router.post("/create-account", AccountController.createAccount);
router.post("/log-in", AccountController.authenticateAccount)

module.exports = router;
