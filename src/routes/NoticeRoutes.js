const express = require("express");
const router = express.Router();
const NoticeController = require("../controller/NoticeController");
const multer = require("multer");
const fs = require("fs/promises");

const noticeFilePath = "./uploads/notice";

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        // Check if the directory exists
        fs.access(noticeFilePath, fs.constants.F_OK)
            .then((data) => {
                cb(null, "uploads/");
            })
            .catch((err) => {
                if (err) {
                    // Directory does not exist, create it
                    fs.mkdir(noticeFilePath)
                        .then(() => {
                            cb(null, "uploads/");
                        })
                        .catch((err) => {
                            if (err) {
                                return;
                            }
                        });
                } else {
                    cb(null, "uploads/");
                }
            });
    },
    filename: function (req, file, cb) {
        const uniqueId = Date.now();
        const extension = file?.originalname?.substring(
            file?.originalname?.lastIndexOf(".")
        );
        const fileName = `notice_${uniqueId}${extension}`;
        cb(null,fileName);
    },
});

const uploadConfig = multer({ storage });

// notice router
router.post(
    "/notice/create",
    uploadConfig.single("file"),
    NoticeController.createNotice
);
router.put("/notice/update", NoticeController.updateNotice);
router.delete("/notice/delete", NoticeController.deleteNotice);
router.get("/notice/all", NoticeController.all);
router.get("/notice/classroom", NoticeController.classRoom);
router.get("/notice/training-center", NoticeController.trainingCenter);

module.exports = router;
