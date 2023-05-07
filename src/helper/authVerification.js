const jwt = require('jsonwebtoken');
const { jwtKey } = require('./envVar');
const AccountModel = require('../model/AccountModel');

exports.authVerification = (req, res, next) => {
  const token = req.headers?.authorization;

  if (!token) {
    res.status(404).json({ message: 'Please add authorization header' });
  } else {
    jwt.verify(token, jwtKey, async function (err, decode) {
      // verify token by queying database 
      if (decode) {
          const { id, accountId, accountType, name, email, phoneNumber } = decode;
          const verifyUser = await AccountModel.findOne({
            where: {
            id, accountId, accountType, name, email, phoneNumber
          }})
          if (verifyUser?.dataValues) {
            next();
          } else {
            res.status(404).json({ message: 'Authorization token verification fail' });
          }
      } else {
        res.status(404).json({message: `Got an error ${err?.message}`})
      }
    });
  }

  // next();
}