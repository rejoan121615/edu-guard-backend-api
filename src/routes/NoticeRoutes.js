const express = require("express");
const router = express.Router();
const NoticeController = require("../controller/NoticeController");


// notice router
router.post("/notice/create", NoticeController.createNotice);
router.put("/notice/update", NoticeController.updateNotice);
router.delete("/notice/delete", NoticeController.deleteNotice);
router.get("/notice/all", NoticeController.all);
router.get('/notice/classroom', NoticeController.classRoom)






module.exports = router;
