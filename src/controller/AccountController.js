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

// exports.authenticateAccount = async (req, res, next) => {
//     const authAccountSchema = yup.object().shape({
//         id: 
//     })
// }