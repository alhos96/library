const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

exports.Publisher = model(
  "Publisher",
  new Schema({
    _id: Number,
    name: String,
    nameForSearch: String, //lowercased publisher name
    road: String,
    zipcode: String,
    city: String,
    country: String,
    books: [{ type: Number, ref: "Book" }],
    isDeleted: { type: Boolean, default: false },
  }).plugin(AutoIncrement, { id: "publisher_counter", inc_field: "_id" })
);
