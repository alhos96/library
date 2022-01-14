const mongoose = require("mongoose");
const { Schema, Types, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

exports.Book = model(
  "Book",
  new Schema({
    _id: Number,
    title: String,
    titleForSearch: String, //lowercased book title
    description: String,
    image: String,
    pages: Number,
    price: Number,
    publisher: { type: Number, ref: "Publisher" },
    isDeleted: { type: Boolean, default: false },
  }).plugin(AutoIncrement, { id: "book_counter", inc_field: "_id" })
);
