const express = require("express");
const Database = require("./src/database/database");
const AdminRoute = require("./src/routes/AdminRoute");
const bodyParser = require("body-parser");
const passport = require("passport");
const JwtExtract = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const AccountModel = require("./src/model/AccountModel");

// package setup
const app = express();

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
    secretOrKey: "your_jwt_secret_key",
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

app.post(
    "/auth",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        res.json({ message: "your protechted router" });
    }
);

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
