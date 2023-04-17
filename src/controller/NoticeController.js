const NoticeModel = require("../model/NoticeModel");
const yup = require("yup");

const NoticeSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    files: yup.string().required(),
    noticeType: yup.string().required(),
});

exports.createNotice = async (req, res, next) => {
    try {
        // validate user input data
        const validatedData = await NoticeSchema.validate(req.body);

        const [data, created] = await NoticeModel.findOrCreate({
            where: { title: validatedData.title },
            defaults: { ...validatedData, accountId: 1 },
        });

        if (created) {
            res.status(201).json({
                message: "notice created successfully",
                data: data,
            });
        } else {
            res.status(409).json({
                message: "A notice is already available",
                data: data,
            });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ message: "notice creation fail", data: error.message });
    }
};

exports.updateNotice = async (req, res, next) => {
    const updateSchema = NoticeSchema.concat(
        yup.object().shape({
            id: yup.number().required(),
        })
    );
    try {
        // validate user data
        const validatedData = await updateSchema.validate(req.body);
        // find notice
        const updatedData = await NoticeModel.update(
            { ...validatedData },
            {
                where: {
                    id: validatedData.id,
                },
            }
        );
        // updated data
        const newUpdatedData = await NoticeModel.findOne({
            where: { id: validatedData.id },
        });

        res.status(200).json({
            message: "Notice updated with new data",
            data: newUpdatedData,
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            message: "Notice update fail",
            data: error.message,
        });
    }
};

exports.deleteNotice = async (req, res, next) => {
    try {
        const deleteNotice = await NoticeModel.destroy({
            where: {
                id: req.body.id,
            },
        });
        res.status(202).json({
            message: "Notice deletation successfully",
            data: deleteNotice,
        });
    } catch (error) {
        res.status(404).json({ message: "Notice delete fail", data: error.message });
    }
};


exports.all = async (req, res, next) => {

    try {
        const queryData = await NoticeModel.findAll();
        res.status(200).json({message: 'Found the data successfully', data: queryData})
    } catch (error) {
        res.status(404).json({message: 'Something went wrong'})
    }


}

exports.classRoom = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}