const express = require("express");
const router = express.Router();
const AccountController = require("../controller/AccountController");
const NoticeController = require("../controller/NoticeController");
const ConnectController = require("../controller/ConnectController");
const multer = require("multer");
const mimeDb = require("mime-types");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const { HWFilePost } = require("../controller/HomeWorkController");

// user routers
router.post("/admin/scan", )
router.post("/admin/create", AccountController.createAccount);
router.post("/admin/log-in", AccountController.authenticateAccount);

// setting multer storage configration

const diskConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        let folderName = req.params.userId;
        if (folderName) {
            folderName = folderName.slice(1, folderName.length);
            const dirAddress = "uploads/" + folderName;
            if (!fs.existsSync(dirAddress)) {
                fs.mkdirSync(dirAddress);
            }
            cb(null, dirAddress);
        } else {
            throw Error("user id not defined");
        }
    },
    filename: function (req, file, cb) {
        const fileExtension = mimeDb.extension(file.mimetype);
        const fileName = uuid.v4();
        // cb(null, `${fileName}.${fileExtension}`);
        cb(null, `${fileName}.${fileExtension}`);
    },
});

const upload = multer({
    dest: "uploads/",
    storage: diskConfig,
});

// home work api
router.post("/hw/upload/:userId", upload.single("homework"), HWFilePost);

module.exports = router;
