const AccountModel = require("../model/AccountModel");

exports.AllUser = async (req, res, next) => {
    try {
        // get all user
        const allStudents = await AccountModel.findAll({
            where: {
                accountType: "student",
            },
            attributes: { exclude: ["password"] },
        });

        res.status(200).json({
            message: "All the student account found successfully",
            data: allStudents,
        });
    } catch (error) {
      res.status(404).json({
        message: 'Request fail'
      })
    }
};
