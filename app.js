const express = require("express");
const Database = require("./src/database/database");
const bodyParser = require("body-parser");
const passport = require("passport");
const JwtExtract = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const AccountModel = require("./src/model/AccountModel");
const { jwtKey } = require("./src/helper/envVar");
// routes
const AdminRoute = require("./src/routes/AdminRoute");
const CommonRoute = require("./src/routes/CommonRoutes");
const NoticeRoute = require("./src/routes/NoticeRoutes");
const FilesRoutes = require("./src/routes/FilesRoutes");

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

// setup json web token authentication
const options = {
    jwtFromRequest: JwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtKey,
};

passport.use(
    new JwtStrategy(options, function (jwtPayload, done) {
        AccountModel.findOne({ where: { accountId: jwtPayload.accountId } })
            .then((data) => {
                // console.log(data.dataValues)
                if (data) {
                    return done(null, data);
                } else {
                    return done(null, false);
                }
            })
            .catch((error) => {
                return done(error, false);
            });
    })
);

// admin routes
app.use(AdminRoute);
app.use(CommonRoute);
app.use(NoticeRoute);
app.use(FilesRoutes);

// trainer routes

// class captain route

// student routes

// message route / connects route
require("./src/controller/MessageController")(io);

Database.sync({ force: true }).then(() => {
    http.listen(5000, () => {
        console.log(`Server listening on port http://localhost:${5000}`);
    });
});
