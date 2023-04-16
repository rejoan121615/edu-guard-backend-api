const express = require("express");
const router = express.Router();
const ConnectController = require("../controller/ConnectController");


// connects page routers
router.get("/connects/allUser", ConnectController.AllUser);

module.exports = router;
