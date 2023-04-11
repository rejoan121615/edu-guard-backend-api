const express = require("express");
const router = express.Router();
const AccountController = require("../controller/AccountController");
const NoticeController = require("../controller/NoticeController");
const ConnectController = require("../controller/ConnectController");
const multer = require("multer");
const mimeDb = require('mime-types');
const uuid = require('uuid');

// user routers

router.post("/user/create", AccountController.createAccount);
router.post("/user/log-in", AccountController.authenticateAccount);

// notice router
router.post("/notice/create", NoticeController.createNotice);
router.put("/notice/update", NoticeController.updateNotice);
router.delete("/notice/delete", NoticeController.deleteNotice);

// connects page routers
router.get("/connects/allUser", ConnectController.AllUser);

// setting multer storage configration

const diskConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  }, 
  filename: function (req, file, cb) {
    const fileExtension = mimeDb.extension(file.mimetype);
    const fileName = uuid.v4();
    // cb(null, `${fileName}.${fileExtension}`);
    cb(null, `${fileName}.${fileExtension}`);
  }
})

const upload = multer({
    dest: "uploads",
    storage: diskConfig,
});

// home work api
router.post("/hw/upload", upload.single("homework"), (req, res, next) => {
    req.file.filename;
    console.log(req.file);
    res.json({ message: "file upload successfully" });
});

module.exports = router;
