const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

exports.User = model(
  "User",
  new Schema({
    _id: Number,
    name: String,
    username: String,
    password: String,
    role: String,
  }).plugin(AutoIncrement, { id: "user_counter", inc_field: "_id" })
);
