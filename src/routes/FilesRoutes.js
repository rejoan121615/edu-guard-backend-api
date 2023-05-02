const express = require("express");
const router = express.Router();
const FileModel = require("../model/FileModel");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // check if folder exists if not create it
        if (!fs.existsSync("./src/uploads")) {
            fs.mkdirSync("./src/uploads");
        }

        cb(null, "./src/uploads");
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${fileName}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.post("/share/upload", upload.single("file"), async (req, res, next) => {
    const title = req.body?.title;
    // store uploaded file url
    const uploadedFile = await FileModel.create({
        uploadedBy: 1213,
        title: title,
        fileUrl: req.file.path,
        allowModify: false,
        fileSize: req.file.size,
    });
    console.log(uploadedFile.dataValues);
    next();
});

module.exports = router;
