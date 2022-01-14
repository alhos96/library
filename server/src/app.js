const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const config = require("../config");

const userRoutes = require("./routes/userRoutes");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const publisherRoutes = require("./routes/publisherRoutes");

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

//public folder
app.use(express.static("./src/public"));

//routes
app.use("/users", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/publishers", publisherRoutes);

mongoose
  .connect(config.mongo)
  .then(() => {
    app.listen(config.port);
    console.log(`Server started on port:${config.port}`);
  })
  .catch((err) => {
    console.log(err);
  });
