const AccountModel = require("../model/AccountModel");
const yup = require("yup");
const bcrypt = require("bcrypt");

// account data validator
const newAccountSchema = yup.object().shape({
    accountType: yup.string().required(),
    studentId: yup.number().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    email: yup
        .mixed()
        .when("$isString", (isString, schema) =>
            isString ? yup.string().email().nullable() : schema.nullable()
        ),

    phoneNumber: yup.mixed().when("$isString", (isString, schema) =>
        isString
            ? yup
                  .string()
                  .matches(/01[0-9]{9}$/)
                  .nullable()
            : schema.nullable()
    ),
    passwordUpdate: yup
        .mixed()
        .when("$isString", (isString, schema) =>
            isString ? yup.string().nullable() : schema.nullable()
        ),
});

// create account controller
exports.createAccount = async (req, res, next) => {
    try {
        const validateUserData = await newAccountSchema.validate(req.body);
        // hash password
        const hasedPass = await bcrypt.hash(req.body.password, 15);
        // create new user on the database
        validateUserData.password = hasedPass;
        const newUserData = await AccountModel.create(validateUserData);
        res.json({ message: "created successfully", data: newUserData });
    } catch (error) {
        console.log("got an error", error.message);
        res.status(400).json({ message: error.message });
    }
};

// authenticate my account
exports.authenticateAccount = async (req, res, next) => {
    // yup validation schema
    const authAccountSchema = yup.object().shape({
        studentId: yup.number().required(),
        password: yup.string().required(),
        accountType: yup.string().required(),
    });

    try {
        // validate input
        const userData = await authAccountSchema.validate(req.body);
        // find user
        const queryData = await AccountModel.findOne({
            where: {
                studentId: userData.studentId,
            },
        });
        // match password
        const passMatch = await bcrypt.compare(
            userData.password,
            queryData.password
        );
        if (passMatch) {
            res.status(200).json({
                message: "account authenticate successfully",
                data: queryData,
            });
        } else {
            res.status(401).json({
                message: 'Wrong Password',
                data: null
            });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};
