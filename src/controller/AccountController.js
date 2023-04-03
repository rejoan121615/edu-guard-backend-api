const AccountModel = require("../model/AccountModel");
const yup = require("yup");

// account data validator
const newAccountSchema = yup.object().shape({
    accountType: yup.string().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    email: yup
        .mixed()
        .nullable()
        .when("$isString", (isString, schema) =>
            isString ? schema.string().email() : schema
        ),

    phoneNumber: yup
        .mixed()
        .nullable()
        .when("$isString", (isString, schema) =>
            isString ? schema.string().matches(/^\+8801[0-9]{9}$/) : schema
        ),
    passwordUpdate: yup
        .mixed()
        .nullable()
        .when("$isString", (isString, schema) =>
            isString ? schema.string() : schema
        ),
});

exports.createAccount = async (req, res, next) => {
    try {
        // const {
        //     accountType,
        //     name,
        //     password,
        //     email,
        //     phoneNumber,
        //     passwordUpdate,
        // } = await req.body;
        const validateUserData = await newAccountSchema.validate(req.body);
        res.json({ message: "created successfully" });
    } catch (error) {
        console.log("got an error", error.message);
        console.log(error.stack);
        res.json({message: 'creation fail'})
    }

    // const accountData = await AccountModel.create({
    //     accountType,
    //     name,
    //     password,
    //     email,
    //     phoneNumber,
    //     passwordUpdate,
    // });
    // res.json({ message: "created successfully", data: accountData.dataValues });
};
