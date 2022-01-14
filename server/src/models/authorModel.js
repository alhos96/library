const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

exports.Author = model(
  "Author",
  new Schema({
    _id: Number,
    name: String,
    nameForSearch: String, //lowercased author name
    image: String,
    biography: String,
    birthday: Date,
    email: String,
    books: [{ type: Number, ref: "Book" }],
    isDeleted: { type: Boolean, default: false },
  }).plugin(AutoIncrement, { id: "author_counter", inc_field: "_id" })
);
