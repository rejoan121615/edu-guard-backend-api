const express = require("express");
const router = express.Router();
const NoticeController = require("../controller/NoticeController");
const multer = require('multer');




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../uploads');
  },
  filename: function (req, file, cb) {
    console.log('hello rejoan')
    console.log(req)
    cb(null, file.filename);
  }
})

const uploadConfig = multer({ storage });

// notice router
router.post("/notice/create", uploadConfig.single("file"), NoticeController.createNotice);
router.put("/notice/update", NoticeController.updateNotice);
router.delete("/notice/delete", NoticeController.deleteNotice);
router.get("/notice/all", NoticeController.all);
router.get('/notice/classroom', NoticeController.classRoom);
router.get("/notice/training-center", NoticeController.trainingCenter);






module.exports = router;
