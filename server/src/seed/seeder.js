require("dotenv").config();
const { Author } = require("../models/authorModel");
const { Book } = require("../models/bookModel");
const { Publisher } = require("../models/publisherModel");
const { User } = require("../models/userModel");
const mongoose = require("mongoose");
const authors = require("./data/Authors.json");
const users = require("./data/Users.json");
const books = require("./data/Books.json");
const publishers = require("./data/Publishers.json");
const config = require("../../config");
const bcrypt = require("bcrypt");

mongoose.connect(config.mongo).then(() => {
  mongoose.connection.collections["counters"].drop(function (err) {
    console.log("counters collection dropped");
  }); //drop mongoose-sequence costum collection so it can count right
  mongoose.connection.collections["books"].drop(function (err) {
    console.log("books collection dropped");
  });
  mongoose.connection.collections["users"].drop(function (err) {
    console.log("users collection dropped");
  });
  mongoose.connection.collections["authors"].drop(function (err) {
    console.log("authors collection dropped");
  });
  mongoose.connection.collections["publishers"].drop(function (err) {
    console.log("publishers collection dropped");
  });
  seed();
});

var done = 0;

function seed() {
  books.forEach(async (book, i) => {
    let newBook = new Book({
      _id: book._id,
      title: book.title,
      titleForSearch: book.title.toLowerCase(),
      description: book.description,
      image: book.image,
      pages: book.pages,
      price: book.price,
      publisher: book.publisher,
    });

    try {
      await newBook.save();
      done++;
    } catch (error) {
      console.log(error);
    }

    if (done === books.length) {
      console.log("seeding books done");
      done = 0;

      users.forEach(async (user, i) => {
        let hashedPassword = await bcrypt.hash(user.password, 12);
        let newUser = new User({
          _id: user._id,
          name: user.name,
          username: user.username,
          password: hashedPassword,
          role: user.role,
        });

        try {
          await newUser.save();
          done++;
        } catch (error) {
          console.log(error);
        }

        if (done === users.length) {
          console.log("seeding users done");
          done = 0;
          authors.forEach(async (author, i) => {
            let newAuthor = new Author({
              _id: author._id,
              name: author.name,
              nameForSearch: author.name.toLowerCase(),
              biography: author.biography,
              instructions: author.instructions,
              image: author.image,
              birthday: new Date(author.birthday),
              email: author.email,
              books: author.books,
            });

            try {
              await newAuthor.save();
              done++;
            } catch (error) {
              console.log(error);
            }

            if (done === authors.length) {
              console.log("seeding authors done");
              done = 0;
              publishers.forEach(async (publisher, i) => {
                let newPublisher = new Publisher({
                  _id: publisher._id,
                  name: publisher.name,
                  nameForSearch: publisher.name.toLowerCase(),
                  road: publisher.road,
                  zipcode: publisher.zipcode,
                  city: publisher.city,
                  country: publisher.country,
                  books: publisher.books,
                });

                try {
                  await newPublisher.save();
                  done++;
                } catch (error) {
                  console.log(error);
                }

                if (done === publishers.length) {
                  console.log("seeding publishers done");
                  console.log("all done");
                  mongoose.disconnect();
                }
              });
            }
          });
        }
      });
    }
  });
}
