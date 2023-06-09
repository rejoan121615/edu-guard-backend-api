const express = require("express");
const Database = require("./src/database/database");
const bodyParser = require("body-parser");
// routes
const { authVerification } = require("./src/helper/authVerification");
const AdminRoute = require("./src/routes/StudentRoute");
const CommonRoute = require("./src/routes/CommonRoutes");
const NoticeRoute = require("./src/routes/NoticeRoutes");
const FilesRoutes = require("./src/routes/FilesRoutes");
const AccountRoute = require("./src/routes/AdminRoute");

// package setup
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// set header
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:1212");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

// parse data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// admin routes
app.use(AccountRoute);
app.use(AdminRoute);
app.use(CommonRoute);
app.use(NoticeRoute);
app.use(FilesRoutes);
app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
});

// trainer routes

// class captain route

// student routes

// message route / connects route
require("./src/controller/MessageController")(io);

Database.sync({}).then(() => {
    http.listen(5000, () => {
        console.log(`Server listening on port http://localhost:${5000}`);
    });
});
