const express = require("express");
const router = express.Router();
const AccountController = require("../controller/AccountController");
const NoticeController = require("../controller/NoticeController");

// user routers

router.post("/user/create", AccountController.createAccount);
router.post("/user/log-in", AccountController.authenticateAccount);

// notice router
router.post("/notice/create", NoticeController.createNotice);
router.put("/notice/update", NoticeController.updateNotice);
router.delete("/notice/delete", NoticeController.deleteNotice);


module.exports = router;
