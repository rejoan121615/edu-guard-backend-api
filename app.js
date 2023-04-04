const express = require("express");
const Database = require("./src/database/database");
const AdminRoute = require("./src/routes/AdminRoute");
const bodyParser = require("body-parser");

// package setup

const app = express();

// parse data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// admin routes
app.use(AdminRoute);

// trainer routes

// class captain route

// student routes

Database.sync().then(() => {
    app.listen(5000, () => {
        console.log(`Server listening on port http://localhost:${5000}`);
    });
});
