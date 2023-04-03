"use strict";

var AccountModel = require("../model/AccountModel");

var yup = require("yup");

var bcrypt = require("bcrypt"); // account data validator


var newAccountSchema = yup.object().shape({
  accountType: yup.string().required(),
  studentId: yup.number().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  email: yup.mixed().when("$isString", function (isString, schema) {
    return isString ? yup.string().email().nullable() : schema.nullable();
  }),
  phoneNumber: yup.mixed().when("$isString", function (isString, schema) {
    return isString ? yup.string().matches(/01[0-9]{9}$/).nullable() : schema.nullable();
  }),
  passwordUpdate: yup.mixed().when("$isString", function (isString, schema) {
    return isString ? yup.string().nullable() : schema.nullable();
  })
}); // create account controller

exports.createAccount = function _callee(req, res, next) {
  var validateUserData, hasedPass, newUserData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(newAccountSchema.validate(req.body));

        case 3:
          validateUserData = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 15));

        case 6:
          hasedPass = _context.sent;
          // create new user on the database
          validateUserData.password = hasedPass;
          _context.next = 10;
          return regeneratorRuntime.awrap(AccountModel.create(validateUserData));

        case 10:
          newUserData = _context.sent;
          res.json({
            message: "created successfully",
            data: newUserData
          });
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log("got an error", _context.t0.message);
          res.status(400).json({
            message: _context.t0.message
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}; // authenticate my account


exports.authenticateAccount = function _callee2(req, res, next) {
  var authAccountSchema, userData, queryData, passMatch;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // yup validation schema
          authAccountSchema = yup.object().shape({
            studentId: yup.number().required(),
            password: yup.string().required(),
            accountType: yup.string().required()
          });
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(authAccountSchema.validate(req.body));

        case 4:
          userData = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(AccountModel.findOne({
            where: {
              studentId: userData.studentId
            }
          }));

        case 7:
          queryData = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(userData.password, queryData.password));

        case 10:
          passMatch = _context2.sent;

          if (passMatch) {
            res.status(200).json({
              message: "account authenticate successfully",
              data: queryData
            });
          } else {
            res.status(401).json({
              message: 'Wrong Password',
              data: null
            });
          }

          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](1);
          res.json({
            message: _context2.t0.message
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 14]]);
};