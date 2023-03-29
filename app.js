const express = require("express");
const Database = require("./src/database/database");

// data model
const UserModel = require("./src/model/UserModel");

// package setup

const app = express();

app.get("/", async (req, res, next) => {
    const userData = await UserModel.create({
        name: "mohd Rejoan",
        ["student-id"]: 96852254,
    });
    console.log(userData);
    next();
});


Database.sync().then(() => {
    app.listen(4545, () => {
        console.log(`Server listening on port ${4545}`);
    });
});
