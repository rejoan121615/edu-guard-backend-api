const AccountModel = require("../model/AccountModel");
const yup = require("yup");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// account data validator
const newAccountSchema = yup.object().shape({
    accountType: yup.string().required(),
    accountId: yup.number().required(),
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
        // find the duplicate user
        const queryData = await AccountModel.findOne({
            where: {
                accountId: validateUserData.accountId,
            },
        });

        if (!queryData) {
            const hasedPass = await bcrypt.hash(req.body.password, 10);
            // create new user on the database
            validateUserData.password = hasedPass;
            const newUserData = await AccountModel.create(validateUserData);
            res.status(201).json({ message: "created successfully", data: newUserData });
        } else {
            res.status(409).json({
                message: "A account is already there with the same id",
            });
        }
        // hash password
    } catch (error) {
        console.log("got an error", error.message);
        res.status(400).json({ message: error.message });
    }
};

// authenticate my account
exports.authenticateAccount = async (req, res, next) => {

    // yup validation schema
    const authAccountSchema = yup.object().shape({
        accountId: yup.number().required(),
        password: yup.string().required(),
        accountType: yup.string().required(),
    });

    try {
        // validate input
        const userData = await authAccountSchema.validate(req.body);
        // find user
        const queryData = await AccountModel.findOne({
            where: {
                accountId: userData.accountId,
            },
        });
        // match password
        const passMatch = await bcrypt.compare(
            userData.password,
            queryData.password
        );

        
        if (passMatch) {
            console.log('user date', req.body)
            // generate token
            const personToken = jwt.sign({ accountId: req.body.accountId }, "your_jwt_secret_key", {
                expiresIn: "1h",
            });
            // remove res pass filed 
            let userResData = {...queryData.dataValues};
            delete userResData.password;
            // server response 
            res.status(200).json({
                message: "account authenticate successfully",
                data: userResData,
                token: personToken
            });
        } else {
            res.status(401).json({
                message: "Wrong Password, Please Enter a correct password",
                data: null,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Account is not available or Trainee id incorrect" });
    }
};
