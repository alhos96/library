const { User } = require("../models/userModel");
const config = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  //check username

  let existingUser = await User.findOne({ username: username.trim() });
  console.log(existingUser);

  if (!existingUser) {
    let error = new Error("User with that name doesn't exist.");
    res.status(400).json({ message: "User with that name doesn't exist." });

    return next(error);
  }

  //check password

  let enteredPassword;

  try {
    enteredPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    console.log(error);
    return next(error);
  }

  if (!enteredPassword) {
    let error = new Error("Wrong password!");
    res.status(400).json({ message: "Wrong password!" });

    return next(error);
  }

  //send token

  let { id, name, role } = existingUser;

  let token = jwt.sign({ id, username, name, role }, config.secret);

  res.status(201).json({ token, name, username, role });

  console.log(`user logged in as ${username}`);
};
