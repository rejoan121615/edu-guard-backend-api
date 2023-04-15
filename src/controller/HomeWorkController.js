const HomeWorkModel = require("../model/HomeWorkModel");
const yup = require('yup');

const HwSchema = yup.object().shape({
  title: yup.string().required(),
  fileUrl: yup.string().required(),
  allowModify: yup.boolean().required(),
  fileSize: yup.number().required()
})

exports.HWFilePost = async (req, res, next) => {

  const date = new Date();
  date.toISOString()

  const data = {
      title: `${req.params.userId}-`
    }
    const newHWData = await HomeWorkModel.create({
        title: "Something",
        fileUrl: "an url",
        allowModify: false,
        fileSize: 2500,
    });

    res.json({ message: "file upload successfully", data: newHWData });
};
