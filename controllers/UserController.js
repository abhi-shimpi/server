const express = require("express");
const User = require("../model/User");
const Forms = require('../model/Form')
const ObjectId = require('express').ObjectId;
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./localStorage");
var decoded;

const router = express.Router();
router.get("/aa", (req, res) => {
  res.send("ok");
});
router.post("/signup", (req, res) => {
  const errors = validationResult(req);
  const { name, email, password,confirm_password } = req.body;
  const checkUser =  User.findOne({ email });
  if (checkUser) {
      return res.status(422).json({ error: "Email already exists" });
  }
  if(password != confirm_password){
    return res.status(422).json({ error: "Password not match with confirm password" });
  }
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(422).json({
        error: "Unable to add user",
      });
    }

    return res.json({
      message: "Success",
      user,
    });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  //find user
   User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email was not found",
      });
    }
    // Authenticate user
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    // Create token
    const token = jwt.sign({ email:user.email }, "secretkey");

    //Extract role payload from token.
    decoded = jwt.verify(token, "secretkey");
    // console.log(decoded.role);

    // Put token in cookie
    res.cookie("token", token, { expire: new Date() + 1 });

    // Send response
    const { _id, name, email } = user;

    //Store UserId in LocalStorage
    const UserId = _id;
    localStorage.setItem("UserId", UserId);
    console.log(localStorage.getItem("UserId"));

    res.send(user._id)
  });
});

router.get("/signout", (req, res) => {
  res.clearCookie("token");
  return res.json({
    message: "User signout successful",
  });
});

router.get("/alreadyExist/:id", async (req,res) => {
  try {
    const userId = req.params.id;
    const form = await Forms.find({ userId });
    if(form){
      res.status(200).send(form);
    }
    else{
      res.status(201).send("No Form exist");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
})

module.exports = router;
